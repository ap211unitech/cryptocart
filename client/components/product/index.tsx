"use client";

import { ChevronsRight, LoaderCircle } from "lucide-react";
import { ethers } from "ethers";
import Image from "next/image";
import { useAtom } from "jotai";

import { Rating } from "../ui/rating";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import { Loading } from "./loading";

import { useGetProduct, usePurchaseProduct } from "@/hooks";
import { selectedAccountAtom } from "@/providers/jotai";

export const ProductItem = ({ productId }: { productId: string }) => {
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const { data: product, isLoading } = useGetProduct({ productId });
  const { mutateAsync: purchaseProduct, isPending: isPurchaseProductLoading } =
    usePurchaseProduct();

  if (isLoading) return <Loading />;

  return (
    <div className="md:container px-8 grid lg:grid-cols-2 my-8">
      {!product ? (
        <h1 className="text-xl">No such product found...</h1>
      ) : (
        <>
          <div className="w-full relative h-[300px] md:h-[400px] mb-10">
            <Image
              alt={product.name}
              src={product.image}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="lg:px-20"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <Rating rating={product.rating} />
            <p className="text-muted-foreground my-2">
              {ethers.utils.formatUnits(product.cost.toString(), "ether")} ETH
            </p>
            <Separator />
            <section className="my-4">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="text-muted-foreground text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati, labore est? Minima facere aperiam ipsa at? Facilis
                dolorum nam sint quas, cupiditate, culpa, eligendi dolorem
                dignissimos maiores porro dolores libero.
              </p>
            </section>
            <Separator />
            <section className="my-4">
              <h2 className="text-2xl font-semibold mb-2">Additional Info</h2>
              <section className="text-sm">
                <p className="text-muted-foreground flex items-center gap-2">
                  <span className="text-xl">🎉</span>
                  <span className="flex items-center">
                    FREE Delivery
                    <ChevronsRight className="w-4 h-4" />
                  </span>
                  <strong className="text-black -mx-2">
                    {new Date(Date.now() + 345600000).toLocaleDateString(
                      undefined,
                      {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </strong>
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <span className="text-xl">⛴️</span>
                  <span>Shipped by CryptoCart</span>
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <span className="text-xl">🗳️</span>
                  <span>Sold by CryptoCart</span>
                </p>
              </section>
            </section>

            {product.stock > 1 ? (
              selectedAccount && (
                <Button
                  onClick={() => purchaseProduct(product)}
                  disabled={isPurchaseProductLoading}
                >
                  {isPurchaseProductLoading && (
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Purchase
                </Button>
              )
            ) : (
              <p className="text-destructive">Out of stock</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
