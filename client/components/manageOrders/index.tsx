"use client";

import { useMemo } from "react";
import { useWindowSize } from "usehooks-ts";
import { BigNumber, ethers } from "ethers";
import { ChevronDown, Files } from "lucide-react";
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
import { useChangeOrderStatus } from "@/hooks";
import { useAllOrders } from "@/hooks/useAllOrders";
import { trimAddress } from "@/lib/utils";
import { toast } from "sonner";
import { availableStatuses } from "@/config/orderStatus";

export const ManageOrders = () => {
  const { width } = useWindowSize();
  const { data: allOrders, isLoading, isPending } = useAllOrders();
  const { mutateAsync: onChangeOrderStatus } = useChangeOrderStatus();

  const handleChangeOrderStatus = (
    buyer: string,
    newOrderStatus: OrderStatus,
    orderId: number
  ) => {
    onChangeOrderStatus({ buyer, newOrderStatus, orderId });
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied Successfully !!");
  };

  const isResponsive = useMemo(() => width < 450, [width]);

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="md:container p-4">
      {!allOrders?.length ? (
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
          {allOrders.map((order) => {
            return (
              <div key={order.buyer} className="mt-6">
                <h2
                  className={`font-semibold flex items-center ${
                    isResponsive && "text-center"
                  }`}
                >
                  <span>Purchased by :</span>
                  <span className="text-muted-foreground ml-2 flex items-center gap-2">
                    {trimAddress(order.buyer, 4)}{" "}
                    <Files
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleCopy(order.buyer)}
                    />
                  </span>
                </h2>
                <div className="flex flex-col gap-8 my-4">
                  {order.orders.map((e, orderId) => {
                    return (
                      <div
                        key={e.time}
                        className={`flex gap-8 ${
                          isResponsive && "flex-col mx-auto"
                        }`}
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
                          <h2 className="text-xl font-semibold">
                            {e.product.name}
                          </h2>
                          <p className="text-muted-foreground text-sm mb-2">
                            {ethers.utils.formatUnits(
                              e.product.cost.toString(),
                              "ether"
                            )}{" "}
                            ETH
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
                                            handleChangeOrderStatus(
                                              order.buyer,
                                              s.type,
                                              orderId + 1
                                            )
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
            );
          })}
        </div>
      )}
    </div>
  );
};
