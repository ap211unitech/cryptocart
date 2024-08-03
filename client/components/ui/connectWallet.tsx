"use client";

import { useAtom } from "jotai";
import { Button } from "./button";
import { selectedAccountAtom } from "@/providers/jotai";
import { Power } from "lucide-react";

export const ConnectWallet = () => {
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);

  const handleConnect = async () => {
    if (window.ethereum) {
      const wallets = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      if (wallets.length) setSelectedAccount(wallets[0]);
    }
  };

  const handleLogout = () => setSelectedAccount(null);

  return (
    <div>
      {selectedAccount ? (
        <div className="flex items-center gap-4">
          <p>
            {`${selectedAccount.slice(0, 8)}...${selectedAccount.slice(
              38,
              42
            )}`}
          </p>
          <Button
            size="sm"
            variant="destructive"
            className="px-2 py-1 bg-red-500"
            onClick={handleLogout}
          >
            <Power className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <Button onClick={handleConnect}>Connect</Button>
      )}
    </div>
  );
};
