"use client";

import { Cormorant_Garamond as CormorantGaramond } from "next/font/google";
import Link from "next/link";
import { ConnectWallet } from "./connectWallet";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const CormorantFont = CormorantGaramond({
  subsets: ["latin-ext"],
  weight: ["700"],
});

export const Navigation = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-b shadow-sm flex items-center justify-between px-4 py-2">
      <h1
        className={`text-pink sm:px-4 py-2 font-semibold text-4xl cursor-pointer ${CormorantFont.className}`}
      >
        <Link href="/">CryptoCart</Link>
      </h1>
      <div className="flex items-center gap-3 pr-4">
        <Button
          variant="outline"
          size="icon"
          className="border-0"
          onClick={() => {
            if (theme === "dark") setTheme("light");
            else setTheme("dark");
          }}
        >
          <Sun className="w-5 h-5 hidden dark:block" />
          <Moon className="w-5 h-5 block dark:hidden" />
        </Button>
        <ConnectWallet />
      </div>
    </div>
  );
};
