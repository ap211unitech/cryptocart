import { abi } from "@/config/abi";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { useMutation } from "@tanstack/react-query";
import { BigNumber, ethers } from "ethers";
import { toast } from "sonner";

type CreateProductArgs = {
  id: number;
  productName: string;
  category: string;
  image: string;
  description: string;
  cost: BigNumber;
  rating: number;
  stock: number;
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async ({
      id,
      productName,
      category,
      image,
      description,
      rating,
      cost,
      stock,
    }: CreateProductArgs) => {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const signer = await provider.getSigner();
      const tx = await contract
        .connect(signer)
        .createProduct(
          id,
          productName,
          category,
          description,
          image,
          cost,
          rating,
          stock
        );
      await tx.wait();
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Product created successfully !!");
    },
  });
};
