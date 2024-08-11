import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useAtom } from "jotai";

import { abi } from "@/config/abi";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { adminAtom, selectedAccountAtom } from "@/providers/jotai";
import { AllOrder, Order } from "@/types";
import { getProvider } from "@/lib/utils";

export const useAllOrders = () => {
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const [isAdmin] = useAtom(adminAtom);

  return useQuery<AllOrder[]>({
    queryKey: ["allOrders", selectedAccount, isAdmin],
    enabled: !!selectedAccount && !!isAdmin,
    queryFn: async () => {
      const provider = getProvider();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        abi,
        provider.getSigner(0)
      );

      const allBuyers = (await contract.queryFilter("ProductPurchased"))
        .map((e) => e.args?.at(0))
        .filter(
          (value, index, self) =>
            value !== undefined && self.indexOf(value) === index
        );

      const orders = allBuyers.map(async (buyer): Promise<AllOrder> => {
        const buyerOrders: Order[] = [];

        const orderCount = await contract.orderCount(buyer);

        for (let orderId = 1; orderId <= orderCount; orderId++) {
          const { time, status, product } = (await contract.orders(
            buyer,
            orderId
          )) as Order;
          const {
            category,
            id,
            image,
            name,
            cost,
            rating,
            stock,
            description,
          } = product;
          buyerOrders.push({
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

        return { buyer, orders: buyerOrders };
      });

      return Promise.all(orders);
    },
  });
};
