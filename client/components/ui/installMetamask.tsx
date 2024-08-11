"use client";

import { useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription } from "./alert";

export const InstallMetaMask = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);

  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(!!window.ethereum.isMetaMask);
    } else {
      setIsMetaMaskInstalled(false);
    }
  }, []);

  if (isMetaMaskInstalled) return <></>;

  return (
    <>
      <Alert className="bg-blue-100 py-2 rounded-none">
        <AlertDescription className="flex items-center justify-center gap-2 text-black">
          <TriangleAlert className="h-5 w-5" />
          To use this website, Please ensure that MetaMask is installed.
          <div>
            <Link
              href="https://metamask.io/download/"
              target="_blank"
              className="text-rose-600 hover:underline underline-offset-2"
            >
              Get Metamask
            </Link>
            , Setup accounts, Switch to Sepolia Testnet & Refresh the page.
          </div>
        </AlertDescription>
      </Alert>
    </>
  );
};
