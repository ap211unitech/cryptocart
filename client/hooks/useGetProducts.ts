import { abi } from "@/config/abi";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["getAllProducts"],
    queryFn: async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

        const products = [];
        for (let i = 1; i < 10; i++) {
          const {
            category,
            id,
            image,
            name,
            cost,
            rating,
            stock,
            description,
          } = (await contract.products(i)) as Product;
          products.push({
            category,
            id,
            image,
            name,
            cost,
            rating,
            stock,
            description,
          });
        }
        return products;
      }
      return [];
    },
  });
};
