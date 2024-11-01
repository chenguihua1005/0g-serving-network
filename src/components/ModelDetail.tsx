// ModelDetail.tsx
import React from "react";
import leftIcon from "@/assets/left.svg";
import openNewIcon from "@/assets/open-new.svg";
import checkmarkIcon from "@/assets/check-mark.svg";

type Provider = {
  AttestationDownLoadEndpoint: string;
  Device: string;
  Geolocation: string;
  InputPrice: number;
  Model: string;
  Name: string;
  OutputPrice: number;
  ProviderAddress: string;
  ServiceType: string;
  URL: string;
  UpdatedAt: string;
  Uptime: string;
  Verifiability: string;
};

type ModelData = {
  Name: string;
  Author: string;
  Description: string;
  HuggingFaceURL: string;
  Price: string;
  Providers: Provider[];
  Type: string;
  UserInteractedNumber: number;
  Verifiability: string;
  ZGAlignmentScore: string;
};

interface ModelDetailProps {
  modelData: ModelData;
  onBack: () => void;
}

const ModelDetail: React.FC<ModelDetailProps> = ({ modelData, onBack }) => {
  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center mb-4 text-gray-600 text-sm">
        <img src={leftIcon} alt="Logo" className="w-4 h-4" />
        <span className="cursor-pointer text-blue-500" onClick={onBack}>
          Models
        </span>
        <span className="mx-2">/</span>
        <span className="font-semibold">{modelData.Name}</span>
      </div>

      {/* Model Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">{modelData.Name}</h2>
        <div className="flex justify-between items-center  border-blue-200 rounded-lg p-4 mb-4">
          <div className="text-center">
            <div className="text-pink-500 text-xl font-bold">
              {modelData.Price}
            </div>
            <div className="text-gray-500 text-sm">Per 1M Tokens</div>
          </div>
          <div className="text-center">
            <div className="text-pink-500 text-xl font-bold">
              {modelData.ZGAlignmentScore}
            </div>
            <div className="text-gray-500 text-sm">0G Alignment Score</div>
          </div>
          <div className="text-center">
            <div className="text-pink-500 text-xl font-bold">
              {modelData.UserInteractedNumber.toLocaleString()}
            </div>
            <div className="text-gray-500 text-sm">
              Users interacted with model
            </div>
          </div>
        </div>
        <p className="text-gray-600 mb-2">{modelData.Description}</p>
        <div className="flex items-center space-x-1">
          <a
            href={modelData.HuggingFaceURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 font-semibold hover:underline flex items-center"
          >
            Huggingface
          </a>
          <img
            src={openNewIcon}
            alt="Open in new tab"
            className="w-4 h-4 text-purple-500"
          />
        </div>
      </div>

      {/* Service Providers */}
      <h3 className="text-lg font-semibold mb-2">Service Providers</h3>
      <div className="overflow-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="text-left border-b border-gray-300 text-gray-600">
              <th className="px-4 py-2">Service Providers</th>
              <th className="px-4 py-2">Device</th>
              <th className="px-4 py-2">Geolocation</th>
              <th className="px-4 py-2">Uptime</th>
              <th className="px-4 py-2">Verifiability Type</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {modelData.Providers.map((provider, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b border-gray-200`}
              >
                <td className="px-4 py-2">{provider.Name}</td>
                <td className="px-4 py-2">{provider.Device}</td>
                <td className="px-4 py-2">{provider.Geolocation}</td>
                <td className="px-4 py-2">{provider.Uptime}</td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <span
                    className={`flex items-center px-2 py-1 rounded-full ${
                      provider.Verifiability === "Ultra-Secure"
                        ? "bg-green-100 text-green-600"
                        : provider.Verifiability === "Secure"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {provider.Verifiability}
                    {["Ultra-Secure", "Secure"].includes(
                      provider.Verifiability
                    ) && (
                      <img
                        src={checkmarkIcon}
                        alt="Checkmark"
                        className="w-4 h-4 ml-1"
                      />
                    )}
                  </span>
                </td>
                <td className="px-4 py-2">${provider.InputPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModelDetail;
