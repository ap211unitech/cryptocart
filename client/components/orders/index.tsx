"use client";

import { BigNumber, ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { useOrders, usePurchaseProduct } from "@/hooks";
import { OrderStatus } from "@/types";

import { Loading } from "./loading";

export const Orders = () => {
  const { data: orders, isLoading, isPending } = useOrders();
  const { mutateAsync: purchaseProduct } = usePurchaseProduct();

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="md:container p-4">
      {!orders ? (
        <h1 className="text-xl">No orders found...</h1>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">Your Orders</h1>
          <div className="flex flex-col gap-8 my-4">
            {orders.map((e) => {
              return (
                <div key={e.time} className="flex gap-8">
                  <Link
                    href={`/product?id=${e.product.id}`}
                    className="overflow-hidden"
                  >
                    <Image
                      alt={e.product.name}
                      src={e.product.image}
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                  </Link>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Purchased on{" "}
                      {new Date(
                        BigNumber.from(e.time).toNumber() * 1000
                      ).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="text-xl font-semibold">{e.product.name}</h2>
                    <p className="text-muted-foreground text-sm mb-2">
                      {ethers.utils.formatUnits(
                        e.product.cost.toString(),
                        "ether"
                      )}{" "}
                      ETH
                    </p>
                    <Badge variant="secondary" className="rounded-sm">
                      {e.status === OrderStatus.PaymentDone && "Payment Done"}
                      {e.status === OrderStatus.Completed && "Delivered"}
                      {e.status === OrderStatus.Cancelled && "Rejected"}
                      {e.status === OrderStatus.Shipped && "Shipped"}
                    </Badge>
                    <section className="flex items-center gap-4 mt-4">
                      <Button
                        size="sm"
                        onClick={() => purchaseProduct(e.product)}
                      >
                        Buy Again
                      </Button>
                      <Button variant={"secondary"} size="sm" asChild>
                        <Link href={`/product?id=${e.product.id}`}>
                          View Item
                        </Link>
                      </Button>
                    </section>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
