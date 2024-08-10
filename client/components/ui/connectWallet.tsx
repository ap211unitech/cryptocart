"use client";

import { useAtom } from "jotai";
import { Button } from "./button";
import { adminAtom, selectedAccountAtom } from "@/providers/jotai";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { LogOut, ShoppingBasket } from "lucide-react";
import { useOrders } from "@/hooks";
import { toast } from "sonner";
import { ethers } from "ethers";

export const ConnectWallet = () => {
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);
  const [isAdmin] = useAtom(adminAtom);
  const { data: orders } = useOrders();

  const handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );

      const wallets = (await provider.send(
        "eth_requestAccounts",
        []
      )) as string[];
      if (wallets.length) setSelectedAccount(wallets[0]);
    } else {
      toast.info("Please install Metamask !! Redirecting....");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.open("https://metamask.io/download/", "_blank");
    }
  };

  const handleLogout = () => setSelectedAccount(null);

  return (
    <div>
      {selectedAccount ? (
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Image
                  alt="Metamask Logo"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
                  width={25}
                  height={25}
                />
                {`${selectedAccount.slice(0, 4)}...${selectedAccount.slice(
                  -4
                )}`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/orders">
                  <ShoppingBasket className="mr-2 h-4 w-4" />
                  <span>Your Orders ({orders?.length})</span>
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/manageOrders">
                    <ShoppingBasket className="mr-2 h-4 w-4" />
                    <span>All Orders</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button onClick={handleConnect}>Connect</Button>
      )}
    </div>
  );
};
