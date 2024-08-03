"use client";

import { CONTRACT_ADDRESS } from "@/config/contract";
import { abi } from "@/config/abi";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";

export const ProductsList = () => {
  const getProducts = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

      for (let i = 1; i < 10; i++) {
        const a = await contract.products(i);
        console.log(a.category);
      }
    }
  };

  return (
    <div>
      <Button onClick={getProducts}>Fetch Products</Button>
    </div>
  );
};
