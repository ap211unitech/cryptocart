import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";

import { Product } from "@/types";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { abi } from "@/config/abi";
import { toast } from "sonner";

export const usePurchaseProduct = () => {
  return useMutation({
    mutationFn: async (product: Product) => {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
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
      toast.success("Prouct purchased successfully !!");
    },
  });
};
