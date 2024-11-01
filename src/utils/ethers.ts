import { useState } from "react";
import { BrowserProvider, ethers } from "ethers";

export const useEthersSigner = () => {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        // 请求用户授权连接钱包
        await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);
      } catch (error: any) {
        if (error.code === 4001) {
          console.warn("User rejected the request to connect the wallet.");
          alert("请授权连接钱包以继续使用该功能。");
        } else {
          console.error("Failed to get signer:", error);
        }
      }
    } else {
      console.warn("MetaMask is not installed");
    }
  };

  return { signer, connectWallet };
};
