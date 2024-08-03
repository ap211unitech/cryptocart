"use client";

import { Button } from "./button";
import { useState } from "react";

export const ConnectWallet = () => {
  const [selectedAccount, setSelectedAccount] = useState<string>();

  const handleConnect = async () => {
    if (window.ethereum) {
      const wallets = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      if (wallets.length) setSelectedAccount(wallets.at(0));
    }
  };

  return (
    <>
      {selectedAccount ? (
        <Button>
          {`${selectedAccount.slice(0, 8)}...${selectedAccount.slice(38, 42)}`}
        </Button>
      ) : (
        <Button onClick={handleConnect}>Connect</Button>
      )}
    </>
  );
};
