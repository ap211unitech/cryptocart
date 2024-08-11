import { type ClassValue, clsx } from "clsx";
import { ethers } from "ethers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const trimAddress = (address: string, limit: number) => {
  return address.slice(0, limit) + "...." + address.slice(-4);
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  return provider;
};
