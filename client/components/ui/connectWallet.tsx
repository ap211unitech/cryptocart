"use client";

import { useAtom } from "jotai";
import { Button } from "./button";
import { adminAtom, selectedAccountAtom } from "@/providers/jotai";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { HandCoins, LogOut, ShoppingBasket, SquarePen } from "lucide-react";
import { useOrders, useWithdraw } from "@/hooks";
import { toast } from "sonner";
import { ethers } from "ethers";
import { trimAddress } from "@/lib/utils";
import { Order } from "@/types";

export const ConnectWallet = () => {
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);
  const [isAdmin, setAdmin] = useAtom(adminAtom);
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

  const handleLogout = () => {
    setSelectedAccount(null);
    setAdmin(false);
  };

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
                {trimAddress(selectedAccount, 4)}
              </Button>
            </DropdownMenuTrigger>
            {isAdmin ? (
              <AdminMenu handleLogout={handleLogout} orders={orders || []} />
            ) : (
              <UserMenu handleLogout={handleLogout} orders={orders || []} />
            )}
          </DropdownMenu>
        </div>
      ) : (
        <Button onClick={handleConnect}>Connect</Button>
      )}
    </div>
  );
};

type UserProps = {
  orders: Order[];
  handleLogout: () => void;
};

const UserMenu = ({ orders, handleLogout }: UserProps) => {
  return (
    <DropdownMenuContent>
      <DropdownMenuItem className="cursor-pointer" asChild>
        <Link href="/orders">
          <ShoppingBasket className="mr-2 h-4 w-4" />
          <span>Your Orders ({orders?.length})</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

const AdminMenu = ({ orders, handleLogout }: UserProps) => {
  const { mutateAsync: onWithdraw } = useWithdraw();

  return (
    <DropdownMenuContent className="w-48">
      <DropdownMenuLabel className="text-muted-foreground text-sm">
        Your account
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/orders">
            <ShoppingBasket className="mr-2 h-4 w-4" />
            <span>Your Orders ({orders?.length})</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />

      <DropdownMenuLabel className="text-muted-foreground text-sm">
        Actions
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/createProduct">
            <SquarePen className="mr-2 h-4 w-4" />
            <span>Create Product</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/manageOrders">
            <ShoppingBasket className="mr-2 h-4 w-4" />
            <span>All Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onWithdraw()}
        >
          <HandCoins className="mr-2 h-4 w-4" />
          <span>Withdraw Funds</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
