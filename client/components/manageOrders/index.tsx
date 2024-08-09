"use client";

import { useMemo } from "react";
import { useWindowSize } from "usehooks-ts";
import { BigNumber, ethers } from "ethers";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Loading } from "./loading";

import { OrderStatus } from "@/types";
import { useOrders } from "@/hooks";

export const ManageOrders = () => {
  const { width } = useWindowSize();
  const { data: orders, isLoading, isPending } = useOrders();

  const handleChangeOrderStatus = (orderStatus: OrderStatus) => {
    console.log(orderStatus);
  };

  const isResponsive = useMemo(() => width < 450, [width]);

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="md:container p-4">
      {!orders ? (
        <h1 className="text-xl">No orders found...</h1>
      ) : (
        <div>
          <h1
            className={`text-2xl font-semibold ${
              isResponsive && "text-center"
            }`}
          >
            Manage all orders
          </h1>
          <div className="flex flex-col gap-8 my-4">
            {orders.map((e) => {
              return (
                <div
                  key={e.time}
                  className={`flex gap-8 ${isResponsive && "flex-col mx-auto"}`}
                >
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
                      {e.status !== OrderStatus.Completed && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              className="flex items-center gap-1"
                              size="sm"
                            >
                              Change Status
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {availableStatuses.map((s) => {
                              return (
                                e.status < s.type && (
                                  <DropdownMenuItem
                                    key={s.type}
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleChangeOrderStatus(s.type)
                                    }
                                  >
                                    {s.name}
                                  </DropdownMenuItem>
                                )
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
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
        </div>
      )}
    </div>
  );
};

const availableStatuses = [
  {
    name: "Payment Done",
    type: OrderStatus.PaymentDone,
  },
  {
    name: "Shipped",
    type: OrderStatus.Shipped,
  },
  {
    name: "Reject",
    type: OrderStatus.Cancelled,
  },
  {
    name: "Delivered",
    type: OrderStatus.Completed,
  },
];
