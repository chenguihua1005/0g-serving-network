import { useEffect, useState } from "react";
import { useEthersSigner } from "@/utils/ethers";
import { initializeBroker } from "@/services/brokerService";
import { JsonRpcSigner } from "ethers";
import { seringContractAddress } from "@/config";

import DefaultLayout from "@/layouts/default";
import ModelsTable from "@/components/ModelsTable";

export default function IndexPage() {
  const [models, setModels] = useState<any[]>([]);
  const { signer, connectWallet } = useEthersSigner();

  useEffect(() => {
    const initBroker = async () => {
      if (!signer) {
        console.warn("No signer available");
        return;
      }

      try {
        // 初始化 broker
        const broker = await initializeBroker(
          signer as JsonRpcSigner,
          seringContractAddress
        );
        console.log("models", broker);
        // 获取模型列表
        const modelList = await broker.modelProcessor.listModels();
        setModels(modelList);
        console.log("models", modelList);
      } catch (error) {
        console.error("Error initializing broker or fetching models:", error);
      }
    };

    if (signer) {
      initBroker();
    }
  }, [signer]); // 当 signer 更新时重新运行 initBroker

  return (
    <DefaultLayout>
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
        {signer ? <p>Wallet connected</p> : <p>No wallet connected</p>}
        {models.length > 0 && (
          <div>
            <h2>Models List</h2>
            <ul>
              {models.map((model, index) => (
                <li key={index}>{model.name}</li>
              ))}
            </ul>
          </div>
        )}
        <ModelsTable />
      </div>
    </DefaultLayout>
  );
}
