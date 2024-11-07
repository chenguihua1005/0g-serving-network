import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useEthersSigner } from "@/utils/ethers";
import { initializeBroker } from "@/services/brokerService";
import ModelsTable from "@/components/ModelsTable";
import ModelDetail from "@/components/ModelDetail";
import { JsonRpcSigner } from "ethers";
import { seringContractAddress } from "@/config";
import logo from "@/assets/logo.svg";
import rightIcon from "@/assets/right.svg";
import chatIcon from "@/assets/chat.svg";
import attachmentIcon from "@/assets/attachment.svg";

interface ChatProps {
  onBack: () => void; // 返回回调函数
}

export default function IndexPage() {
  const [models, setModels] = useState<any[]>([]);
  const { signer, connectWallet } = useEthersSigner();
  const [balance, setBalance] = useState<string>("$10.00");
  const [broker, setBroker] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [selectedModelName, setSelectedModelName] = useState<string>("");
  const [selectedProviderName, setSelectedProviderName] = useState<string>("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const initBroker = async () => {
      if (!signer) {
        console.warn("No signer available");
        return;
      }
      try {
        const broker = await initializeBroker(
          signer as JsonRpcSigner,
          seringContractAddress
        );
        setBroker(broker);
        const modelList = await broker.modelProcessor.listModels();
        setModels(modelList);
        console.log("models", models);
      } catch (error) {
        console.error("Error initializing broker or fetching models:", error);
      }
    };

    initBroker();
  }, [signer]);

  const handleModelClick = async (modelName: string) => {
    try {
      const modelData = await broker.modelProcessor.getModel(modelName);
      console.log("modelData", modelData);
      setSelectedModel(modelData);
    } catch (error) {
      console.error("Error fetching model details:", error);
    }
  };

  const handleBackToList = () => {
    setSelectedModel(null);
  };

  const handleBackToModelDetail = () => {
    setShowChat(false); // 返回时显示 ModelDetail 模块
  };

  const handleConfirm = () => {
    setShowChat(true); // 点击确认后显示 Chat 模块
  };

  const onModelSelectionchange = async (e) => {
    console.log("onModelSelectionchange", e.target.value);
    setSelectedModelName(e.target.value);
    const modelData = await broker.modelProcessor.getModel(selectedModelName);
    setSelectedModel(modelData);
  };

  const onProviderSelectionchange = async (e) => {
    const selectedProvider = selectedModel?.Providers.find(
      (provider) => provider.Name === e.target.value
    );
    setSelectedProviderName(selectedProvider?.Name);
    console.log("selectedProvider", selectedModelName);
  };

  const Chat: React.FC<ChatProps> = ({ onBack }) => {
    return (
      <div className="p-6">
        {/* 顶部导航栏 */}
        <header className="flex mb-4">
          <div className="flex items-center space-x-4 mt-2">
            <img src={chatIcon} alt="Checkmark" className="w-4 h-4 ml-1" />
            <div>Chat</div>
            <div className="flex space-x-4">
              <div className="relative bg-gradient-to-r from-[#FFDB3B] via-[#FFA18F] to-[#FF6270] rounded-md p-[1px]">
                <Select
                  placeholder="Select Model"
                  className="w-56 bg-white rounded-md"
                  selectedKeys={[selectedModelName]}
                  onChange={onModelSelectionchange}
                >
                  {models.map((model) => (
                    <SelectItem key={model.Name}>{model.Name}</SelectItem>
                  ))}
                </Select>
              </div>

              <div className="relative bg-gradient-to-r from-[#FFDB3B] via-[#FFA18F] to-[#FF6270] rounded-md p-[1px]">
                <Select
                  placeholder="Select Provider"
                  className="w-56 bg-white rounded-md"
                  selectedKeys={[selectedProviderName]}
                  onChange={onProviderSelectionchange}
                >
                  {selectedModel?.Providers?.map((provider) => (
                    <SelectItem key={provider.Name}>{provider.Name}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </header>

        {/* Chat 选择框和对话区域 */}
        <div className="flex flex-col bg-[#FFFBF5E5] p-4 rounded-lg shadow-md h-96">
          <div className="mt-4">Please select model and service provider.</div>
        </div>

        {/* 用户输入框 */}
        <div className="mt-4 flex items-center pt-4">
          <input
            className="flex-grow border bg-[#FFFBF5E5] rounded-lg p-2 h-20"
            placeholder="Add content"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-100 to-yellow-100">
      <div className="container mx-auto px-4 py-6">
        <header className="flex items-center justify-between">
          {/* 左侧Logo和导航文字 */}
          <div className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm">
            <img src={logo} alt="Logo" className="w-8 h-8" />
            {/* 调整Logo大小 */}
            {/* 导航文字及图标 */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-black">
                Playgrounds
              </span>
              <img
                src={rightIcon}
                alt="Right Icon"
                className="w-3 h-3 text-purple-500"
              />
              {/* 右箭头图标 */}
            </div>
            {/* 分隔符 */}
            <span className="text-gray-300 mx-2">|</span>
            {/* Models文字及图标 */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-black">Models</span>
              <img
                src={rightIcon}
                alt="Right Icon"
                className="w-3 h-3 text-purple-500"
              />
              {/* 右箭头图标 */}
            </div>
          </div>
          {/* 右侧中间部分导航和钱包功能 */}
          <div className="flex items-center space-x-6">
            {/* Docs 和 Ranking 靠右显示 */}
            <div className="flex items-center space-x-6 text-gray-700 mr-6">
              <span className="hover:text-black cursor-pointer">Docs</span>
              <span className="hover:text-black cursor-pointer">Ranking</span>
            </div>
            {!signer ? (
              <button
                onClick={connectWallet}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center rounded-full bg-white border-2 border-blue-500 overflow-hidden">
                {/* 显示金额部分 */}
                <span className="text-blue-500 font-semibold px-4 py-1 bg-white">
                  {balance}
                </span>

                {/* Deposit按钮部分 */}
                <button className="bg-blue-500 text-white px-4 py-1 font-semibold rounded-full">
                  Deposit
                </button>
              </div>
            )}
          </div>
        </header>

        {!selectedModel ? (
          <>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold">All Models</h3>
              <p className="text-gray-500">
                Models provided by 0G Serving available by API or chatbot.
              </p>
            </div>
            <div className="mt-6">
              <ModelsTable models={models} onModelClick={handleModelClick} />
            </div>
          </>
        ) : (
          <div className="p-6">
            {!showChat ? (
              <ModelDetail
                modelData={selectedModel}
                onBack={handleBackToList}
                onConfirm={handleConfirm} // 传递确认函数
              />
            ) : (
              <Chat onBack={handleBackToModelDetail} /> // 传递返回函数
            )}
          </div>
        )}
      </div>
    </div>
  );
}
