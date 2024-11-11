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
import checkmarkIcon from "@/assets/check-mark.svg";
import backgroundImage from "@/assets/background.png";

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

  const handleConfirm = (modelName: string, providerName: string) => {
    setShowChat(true); // 点击确认后显示 Chat 模块
    setSelectedModelName(modelName);
    setSelectedProviderName(providerName);
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
  };

  const Chat: React.FC = ({ onBack }) => {
    const [userInput, setUserInput] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [displayedMessage, setDisplayedMessage] = useState("");

    useEffect(() => {
      if (!responseMessage) return; // 如果没有消息，退出

      let currentIndex = -1;
      setDisplayedMessage(""); // 重置消息

      const typeWriterEffect = () => {
        if (currentIndex < responseMessage.length) {
          // 确保不添加 undefined
          setDisplayedMessage(
            (prev) => prev + responseMessage.charAt(currentIndex)
          );
          currentIndex++;
          setTimeout(typeWriterEffect, 50); // 控制打字速度
        }
      };

      typeWriterEffect();
    }, [isTyping]);

    const handleSend = () => {
      setUserMessage(userInput);
      setUserInput("");
      // Mock API response
      setResponseMessage(
        "Keys unlock the now,\nCode and coin in cosmic play,\nFreedom's spark ignites."
      );
      setTimeout(() => {
        setIsTyping(true);
      }, 1000);
    };

    return (
      <div className="py-2">
        {/* 顶部导航栏 */}
        <header className="flex mb-4">
          <div className="flex items-center space-x-4">
            <img src={chatIcon} alt="Checkmark" className="w-4 h-4 ml-1" />
            <div className="text-lg">Chat</div>
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
                  items={selectedModel?.Providers}
                  placeholder="Select Provider"
                  className="w-60 bg-white rounded-md"
                  defaultSelectedKeys={[selectedProviderName]}
                  onChange={onProviderSelectionchange}
                  renderValue={(items) => {
                    return (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <div>{item.textValue}</div>
                        ))}
                      </div>
                    );
                  }}
                >
                  {(provider) => (
                    <SelectItem key={provider.Name} textValue={provider.Name}>
                      <span className="flex items-center space-x-2">
                        <span>{provider.Name}</span>
                        {["ZKML", "TeeML"].includes(provider.Verifiability) && (
                          <span className="border border-[#FF1CE6] text-[#FF1CE6] rounded-full px-2 py-0.5 text-sm">
                            Verified
                          </span>
                        )}
                      </span>
                    </SelectItem>
                  )}
                </Select>
              </div>
            </div>
          </div>
        </header>

        {/* 对话框区域 */}
        {/* 聊天对话区域 */}
        <div className="flex flex-col bg-[#FFFBF5] rounded-2xl shadow-md p-4 mb-4 space-y-4 h-[400px] overflow-y-auto">
          {/* 显示用户输入的消息 */}
          {userMessage && (
            <div className="self-end bg-[#D1D5DB] rounded-xl p-3 max-w-[60%]">
              {userMessage}
            </div>
          )}
          {/* 模拟接口回复的消息 */}
          {displayedMessage?.length > 0 && (
            <>
              <div className="self-start rounded-xl p-3 flex items-center space-x-2 w-9/20">
                <span className="whitespace-pre-line">{displayedMessage}</span>
              </div>
              {displayedMessage?.length > 74 && (
                <div className="flex self-left items-center ml-3 mt-1">
                  <span className="text-sm font-medium italic text-[#4B5563]">
                    Verified
                  </span>
                  <img
                    src={checkmarkIcon}
                    alt="Checkmark"
                    className="w-6 h-6 ml-1 mt-1"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* 用户输入框 */}
        <div className="relative border rounded-2xl bg-[#FFF7F0] h-28 p-3">
          {/* 输入框文本 */}
          <input
            className="absolute top-0 left-0 w-full bg-transparent border-none outline-none placeholder-gray-500 text-base p-2"
            placeholder="Type your message here."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // 阻止默认换行行为
                handleSend(); // 发送消息
              }
            }}
          />
          {/* 按钮部分 */}
          <button
            className="absolute bottom-2 right-2 text-black flex items-center space-x-2"
            onClick={handleSend}
          >
            <img src={attachmentIcon} alt="Checkmark" className="w-4 h-4" />
            <span className="font-normal text-lg">Add content</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto py-6">
        <header className="flex items-center justify-between">
          {/* 左侧Logo和导航文字 */}
          <div className="flex items-center space-x-2 bg-white border border-[#14141414] rounded-lg p-2 shadow-sm">
            <img src={logo} alt="Logo" className="w-12 h-8" />
            {/* 调整Logo大小 */}
            {/* 导航文字及图标 */}
            <div className="flex items-center space-x-2 pr-2">
              <span className="text-base text-[#141414]">Playgrounds</span>
              <img src={rightIcon} alt="Right Icon" className="w-2 h-2 mt-1" />
              {/* 右箭头图标 */}
            </div>
            {/* 分隔符 */}
            {/* Models文字及图标 */}
            <div className="flex items-center space-x-2 border-l border-l-[#1414141A] pl-4 pr-2">
              <span className="text-base text-[#141414] font-semibold">
                Models
              </span>
              <img src={rightIcon} alt="Right Icon" className="w-2 h-2 mt-1" />
              {/* 右箭头图标 */}
            </div>
          </div>
          {/* 右侧中间部分导航和钱包功能 */}
          <div className="flex items-center space-x-6">
            {/* Docs 和 Ranking 靠右显示 */}
            <div className="flex items-center space-x-6 text-black font-normal text-lg mr-6">
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
              <div className="flex items-center rounded-full bg-white border border-[#FF1CE6] overflow-hidden">
                {/* 显示金额部分 */}
                <span className="text-[#FF1CE6] font-semibold px-4 py-1 bg-white">
                  {balance}
                </span>

                {/* Deposit按钮部分 */}
                <button className="bg-[#FF1CE6] text-white px-4 py-1 font-medium rounded-full">
                  Deposit
                </button>
              </div>
            )}
          </div>
        </header>

        {!selectedModel ? (
          <>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#111827]">
                All Models
              </h3>
              <p className="text-base text-[#484848]">
                Models provided by 0G Serving available by API or chatbot.
              </p>
            </div>
            <div className="mt-6">
              <ModelsTable models={models} onModelClick={handleModelClick} />
            </div>
          </>
        ) : (
          <div className="py-6 px-2">
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
