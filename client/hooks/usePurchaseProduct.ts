import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";

import { Product } from "@/types";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { abi } from "@/config/abi";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { adminAtom, selectedAccountAtom } from "@/providers/jotai";
import { getProvider } from "@/lib/utils";

export const usePurchaseProduct = () => {
  const queryClient = useQueryClient();
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const [isAdmin] = useAtom(adminAtom);

  return useMutation({
    mutationFn: async (product: Product) => {
      const provider = getProvider();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const signer = await provider.getSigner();
      const tx = await contract
        .connect(signer)
        .purchaseProduct(product.id, { value: product.cost });
      await tx.wait();
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Product purchased successfully !!");

      queryClient.refetchQueries({
        queryKey: ["orders", selectedAccount],
        exact: true,
      });

      queryClient.refetchQueries({
        queryKey: ["allOrders", selectedAccount, isAdmin],
        exact: true,
      });
    },
  });
};
