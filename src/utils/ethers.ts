import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useMemo } from "react";
import type { Account, Chain, Client, Transport } from "viem";
import { type Config, useConnectorClient } from "wagmi";

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

// /** Hook to convert a viem Wallet Client to an ethers.js Signer. */
// export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
//   const { data: client } = useConnectorClient<Config>({ chainId });
//   return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
// }

export const useEthersSigner = () => {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const initSigner = async () => {
      if ((window as any).ethereum) {
        try {
          // 请求用户授权连接钱包
          await (window as any).ethereum.request({
            method: "eth_requestAccounts",
          });
          const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
          );
          const signer = provider.getSigner();
          setSigner(signer);
        } catch (error) {
          console.error("Failed to get signer:", error);
        }
      } else {
        console.warn("MetaMask is not installed");
      }
    };

    initSigner();
  }, []);

  return signer;
};
