// src/services/brokerService.ts
import {
  createZGServingUserBroker,
  ZGServingUserBrokerConfig,
  ZGServingUserBroker,
} from "@0glabs/0g-serving-broker";
import { JsonRpcSigner } from "ethers";

// 0G Serving Broker 实例
let broker: ZGServingUserBroker | null = null;

/**
 * 初始化 0G Serving Broker
 *
 * @param signer - 通过 ethers.js 获取的 JsonRpcSigner 实例
 * @param contractAddress - 0G Serving 合约地址
 * @returns Promise<ZGServingUserBroker>
 */
export async function initializeBroker(
  signer: JsonRpcSigner,
  contractAddress: string
): Promise<ZGServingUserBroker> {
  const config: ZGServingUserBrokerConfig = {
    dcapWasmPath: "/dcap-qvl-web_bg.wasm",
  };

  broker = await createZGServingUserBroker(signer, contractAddress, config);
  return broker;
}

/**
 * 获取并验证服务的签名地址
 *
 * @param providerAddress - 提供者地址
 * @param serviceName - 服务名称
 * @returns Promise<string | null>
 */
export async function getVerifiedSigningAddress(
  providerAddress: string,
  serviceName: string
): Promise<string | null> {
  if (!broker) throw new Error("Broker is not initialized");
  return broker.verifier.getAndVerifySigningAddress(
    providerAddress,
    serviceName
  );
}

/**
 * 列出所有模型
 *
 * @returns Promise<any>
 */
export async function listModels(): Promise<any> {
  if (!broker) throw new Error("Broker is not initialized");
  return broker.modelProcessor.listModels();
}

/**
 * 根据名称获取模型
 *
 * @param name - 模型名称
 * @returns Promise<any>
 */
export async function getModelByName(name: string): Promise<any> {
  if (!broker) throw new Error("Broker is not initialized");
  return broker.modelProcessor.getModel(name);
}

/**
 * 生成请求的计费相关头信息
 *
 * @param providerAddress - 提供者地址
 * @param serviceName - 服务名称
 * @param content - 用户输入的内容
 * @returns Promise<Record<string, string>>
 */
export async function generateBillingHeaders(
  providerAddress: string,
  serviceName: string,
  content: string
): Promise<Record<string, string>> {
  if (!broker) throw new Error("Broker is not initialized");

  const headers = broker.requestProcessor.processRequest(
    providerAddress,
    serviceName,
    content
  );

  // 将 headers 类型显式设置为 Record<string, string>
  return headers as Record<string, string>;
}

/**
 * 验证服务响应内容的合法性
 *
 * @param providerAddress - 提供者地址
 * @param serviceName - 服务名称
 * @param content - 服务响应的内容
 * @param responseId - 响应的 ID
 * @returns Promise<boolean>
 */
export async function verifyResponseContent(
  providerAddress: string,
  serviceName: string,
  content: string,
  responseId: string
): Promise<boolean> {
  if (!broker) throw new Error("Broker is not initialized");

  const valid = broker.responseProcessor.processResponse(
    providerAddress,
    serviceName,
    content,
    responseId
  );

  return valid;
}
