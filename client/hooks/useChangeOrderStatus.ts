import { abi } from "@/config/abi";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { getProvider } from "@/lib/utils";
import { adminAtom, selectedAccountAtom } from "@/providers/jotai";
import { OrderStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { toast } from "sonner";

type Args = {
  buyer: string;
  orderId: number;
  newOrderStatus: OrderStatus;
};

export const useChangeOrderStatus = () => {
  const queryClient = useQueryClient();
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const [isAdmin] = useAtom(adminAtom);

  return useMutation({
    mutationFn: async ({ buyer, orderId, newOrderStatus }: Args) => {
      const provider = getProvider();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const signer = await provider.getSigner();
      const tx = await contract
        .connect(signer)
        .changeOrderStatus(buyer, orderId, newOrderStatus);
      await tx.wait();
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Order Status changed !!");

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
