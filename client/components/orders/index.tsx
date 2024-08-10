"use client";

import { BigNumber, ethers } from "ethers";
import { useWindowSize } from "usehooks-ts";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { useOrders, usePurchaseProduct } from "@/hooks";

import { Loading } from "./loading";
import { useMemo } from "react";
import { availableStatuses } from "@/config/orderStatus";
import { LoaderCircle } from "lucide-react";
import { Order } from "@/types";

export const Orders = () => {
  const { width } = useWindowSize();
  const { data: orders, isLoading, isPending } = useOrders();

  const isResponsive = useMemo(() => width < 400, [width]);

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="md:container p-4">
      {!orders?.length ? (
        <h1 className="text-xl">No orders found...</h1>
      ) : (
        <div>
          <h1
            className={`text-2xl font-semibold ${
              isResponsive && "text-center"
            }`}
          >
            Your Orders
          </h1>
          <div className="flex flex-col gap-8 my-4">
            {orders.map((e) => {
              return <OrderItem key={e.time} e={e} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const OrderItem = ({ e }: { e: Order }) => {
  const { width } = useWindowSize();
  const { mutateAsync: purchaseProduct, isPending: isPurchaseProductLoading } =
    usePurchaseProduct();

  const isResponsive = useMemo(() => width < 400, [width]);

  return (
    <div
      key={e.time}
      className={`flex gap-8 ${isResponsive && "flex-col mx-auto"}`}
    >
      <Link href={`/product?id=${e.product.id}`} className="overflow-hidden">
        <Image
          alt={e.product.name}
          src={e.product.image}
          width={200}
          height={200}
          className="rounded-md"
          objectFit="cover"
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
          {ethers.utils.formatUnits(e.product.cost.toString(), "ether")} ETH
        </p>
        {availableStatuses.map((s) => {
          return (
            e.status === s.type && (
              <Badge
                key={s.type}
                variant="secondary"
                className={`rounded-sm ${s.bg}`}
              >
                {s.name}
              </Badge>
            )
          );
        })}
        <section className="flex items-center gap-4 mt-4">
          <Button
            size="sm"
            onClick={() => purchaseProduct(e.product)}
            disabled={isPurchaseProductLoading}
          >
            {isPurchaseProductLoading && (
              <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
            )}
            Buy Again
          </Button>
          <Button variant={"secondary"} size="sm" asChild>
            <Link href={`/product?id=${e.product.id}`}>View Item</Link>
          </Button>
        </section>
      </div>
    </div>
  );
};
