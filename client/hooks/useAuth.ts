import { abi } from "@/config/abi";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { adminAtom, selectedAccountAtom } from "@/providers/jotai";
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const router = useRouter();
  const path = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const [isAdmin, setAdmin] = useAtom(adminAtom);
  const [selectedAccount] = useAtom(selectedAccountAtom);

  const switchNetwork = async () => {
    if (!window.ethereum) return;
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: ethers.utils.hexValue(11155111),
          rpcUrls: ["https://ethereum-sepolia.publicnode.com"],
          chainName: "Sepolia",
          nativeCurrency: {
            name: "SEP",
            symbol: "SEP",
            decimals: 18,
          },
          blockExplorerUrls: ["https://sepolia.etherscan.io/"],
        },
      ],
    });
  };

  useEffect(() => {
    setHydrated(true);
    // switchNetwork();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (selectedAccount) {
      if (!isAdmin && ADMIN_ROUTES.includes(path)) router.push("/");
    } else {
      if (USER_ROUTES.includes(path) || ADMIN_ROUTES.includes(path))
        router.push("/");
    }
  }, [hydrated, isAdmin, path, router, selectedAccount]);

  return useQuery({
    queryKey: ["getUserStatus", selectedAccount],
    enabled: !!selectedAccount,
    queryFn: async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
        const owner = (await contract.owner()) as string;
        setAdmin(owner.toLowerCase() === selectedAccount);
      }
      return 0;
    },
  });
};

const USER_ROUTES = ["/orders"];
const ADMIN_ROUTES = ["/manageOrders", "/createProduct"];
