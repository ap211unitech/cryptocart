import { abi } from "@/config/abi";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { OrderStatus } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import { toast } from "sonner";

type Args = {
  buyer: string;
  orderId: number;
  newOrderStatus: OrderStatus;
};

export const useChangeOrderStatus = () => {
  return useMutation({
    mutationFn: async ({ buyer, orderId, newOrderStatus }: Args) => {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
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
    },
  });
};
