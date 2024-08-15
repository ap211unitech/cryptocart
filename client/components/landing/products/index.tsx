"use client";

import Image from "next/image";
import { ethers } from "ethers";

import { Rating } from "@/components/ui/rating";
import Link from "next/link";
import { useGetProducts } from "@/hooks";
import { Loading } from "./loading";

export const ProductsList = () => {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) return <Loading />;

  if (!products) return <h2 className="text-xl">No products found...</h2>;

  return (
    <div>
      <div>
        {Object.entries(
          Object.groupBy(products, ({ category }) => category.toLowerCase())
        ).map((e) => {
          const category = e[0];
          const items = e[1];
          if (!items) return <></>;
          return (
            <div key={category} className="mb-8">
              <h1 className="text-xl font-semibold capitalize my-4">
                {category}
              </h1>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {items.map((e) => {
                  return (
                    <Link
                      href={`/product?id=${e.id}`}
                      key={e.id}
                      className="border rounded-md overflow-hidden transition hover:scale-105 cursor-pointer"
                    >
                      <div className="w-full relative h-[300px]">
                        <Image
                          alt="Product Image"
                          src={e.image}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                        />
                      </div>
                      <div className="p-2">
                        <Rating rating={e.rating} />
                        <h3 className="font-semibold">{e.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          {ethers.utils.formatUnits(e.cost.toString(), "ether")}{" "}
                          ETH
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
