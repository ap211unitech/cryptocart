"use client";

import Image from "next/image";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { CONTRACT_ADDRESS } from "@/config/contract";
import { abi } from "@/config/abi";
import { productsAtom } from "@/providers/jotai";
import { Product } from "@/types";
import { Rating } from "@/components/ui/rating";
import Link from "next/link";

export const ProductsList = () => {
  const [products, setProducts] = useAtom(productsAtom);

  const getProducts = useCallback(async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

      const products = [];
      for (let i = 1; i < 10; i++) {
        const { category, id, image, name, cost, rating, stock } =
          (await contract.products(i)) as Product;
        products.push({ category, id, image, name, cost, rating, stock });
      }
      setProducts(products);
    }
  }, [setProducts]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <div>
        {Object.entries(
          Object.groupBy(products, ({ category }) => category)
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
