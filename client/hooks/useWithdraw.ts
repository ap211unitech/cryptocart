import { abi } from "@/config/abi";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import { toast } from "sonner";

export const useWithdraw = () => {
  return useMutation({
    mutationFn: async () => {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const signer = await provider.getSigner();
      const tx = await contract.connect(signer).withdraw();
      await tx.wait();
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Funds withdrawn successfully !!");
    },
  });
};
