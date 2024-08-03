import { Cormorant_Garamond as CormorantGaramond } from "next/font/google";
import Link from "next/link";

import { ConnectWallet } from "./connectWallet";

const CormorantFont = CormorantGaramond({
  subsets: ["latin-ext"],
  weight: ["700"],
});

export const Navigation = () => {
  return (
    <div className="border-b shadow-sm flex items-center justify-between px-4 py-2">
      <div>
        <h1
          className={`text-pink px-6 py-2 font-semibold text-4xl cursor-pointer ${CormorantFont.className}`}
        >
          <Link href="/">CryptoCart</Link>
        </h1>
      </div>
      <div>
        <ConnectWallet />
      </div>
    </div>
  );
};
