import { abi } from "@/config/abi";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { getProvider } from "@/lib/utils";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BigNumber, ethers } from "ethers";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["getAllProducts"],
    queryFn: async () => {
      if (window.ethereum) {
        const provider = getProvider();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

        const productIds = (
          (await contract.queryFilter("ProductCreated"))
            .map((e) => e.args?.at(0))
            .filter(
              (value, index, self) =>
                value !== undefined && self.indexOf(value) === index
            ) as BigNumber[]
        ).map((a) => a.toNumber());

        const products = productIds.map(async (i): Promise<Product> => {
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

          return {
            category,
            id,
            image,
            name,
            cost,
            rating,
            stock,
            description,
          };
        });

        return Promise.all(products);
      }
    },
  });
};
