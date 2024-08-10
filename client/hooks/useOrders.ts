import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useAtom } from "jotai";

import { selectedAccountAtom } from "@/providers/jotai";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { abi } from "@/config/abi";
import { Order } from "@/types";

export const useOrders = () => {
  const [selectedAccount] = useAtom(selectedAccountAtom);
  return useQuery<Order[]>({
    queryKey: ["orders", selectedAccount],
    enabled: !!selectedAccount,
    queryFn: async () => {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const orderCount = await contract.orderCount(selectedAccount);
      const orders = [];

      for (let orderId = 1; orderId <= orderCount; orderId++) {
        const { time, status, product } = (await contract.orders(
          selectedAccount,
          orderId
        )) as Order;
        const { category, id, image, name, cost, rating, stock, description } =
          product;
        orders.push({
          time,
          status,
          product: {
            category,
            id,
            image,
            name,
            cost,
            rating,
            stock,
            description,
          },
        });
      }

      return orders;
    },
  });
};
