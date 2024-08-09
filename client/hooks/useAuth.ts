import { abi } from "@/config/abi";
import { CONTRACT_ADDRESS } from "@/config/contract";
import { adminAtom, selectedAccountAtom } from "@/providers/jotai";
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useAtom } from "jotai";

export const useAuth = () => {
  const [, setAdmin] = useAtom(adminAtom);
  const [selectedAccount] = useAtom(selectedAccountAtom);
  return useQuery({
    queryKey: ["getUserStatus"],
    enabled: !!selectedAccount,
    queryFn: async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
        const owner = await contract.owner();
        setAdmin(owner === selectedAccount);
      }
    },
  });
};
