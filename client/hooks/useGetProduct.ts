import { abi } from "@/config/abi";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";

type Props = {
  productId: string;
};

export const useGetProduct = ({ productId }: Props) => {
  return useQuery<Product>({
    queryKey: ["getProduct", productId],
    queryFn: async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

        const { category, id, image, name, cost, rating, stock } =
          (await contract.products(productId)) as Product;

        return { category, id, image, name, cost, rating, stock };
      }
      return {} as Product;
    },
  });
};
