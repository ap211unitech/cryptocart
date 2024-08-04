"use client";

import { useAtom } from "jotai";
import { Cormorant_Garamond as CormorantGaramond } from "next/font/google";
import Link from "next/link";

import { ConnectWallet } from "./connectWallet";

import { selectedAccountAtom } from "@/providers/jotai";
import { useOrders } from "@/hooks";

const CormorantFont = CormorantGaramond({
  subsets: ["latin-ext"],
  weight: ["700"],
});

export const Navigation = () => {
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const { data: orders } = useOrders();

  return (
    <div className="border-b shadow-sm flex items-center justify-between px-4 py-2">
      <div>
        <h1
          className={`text-pink px-6 py-2 font-semibold text-4xl cursor-pointer ${CormorantFont.className}`}
        >
          <Link href="/">CryptoCart</Link>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        {selectedAccount && (
          <>
            <Link
              href="/orders"
              className="text-muted-foreground opacity-80 transition hover:opacity-100"
            >
              My Orders({orders?.length})
            </Link>
          </>
        )}
        <ConnectWallet />
      </div>
    </div>
  );
};
