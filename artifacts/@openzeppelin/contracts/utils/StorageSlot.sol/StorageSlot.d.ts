// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface StorageSlot$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "StorageSlot",
  "sourceName": "@openzeppelin/contracts/utils/StorageSlot.sol",
  "abi": [],
  "bytecode": "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122099f5405b0bb75a431e837de5bd5324c3bc81cea2ef9a2e978c6e312f172e01a764736f6c63430008140033",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122099f5405b0bb75a431e837de5bd5324c3bc81cea2ef9a2e978c6e312f172e01a764736f6c63430008140033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "StorageSlot",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<StorageSlot$Type["abi"]>>;
  export function deployContract(
    contractName: "@openzeppelin/contracts/utils/StorageSlot.sol:StorageSlot",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<StorageSlot$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "StorageSlot",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<StorageSlot$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "@openzeppelin/contracts/utils/StorageSlot.sol:StorageSlot",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<StorageSlot$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "StorageSlot",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<StorageSlot$Type["abi"]>>;
  export function getContractAt(
    contractName: "@openzeppelin/contracts/utils/StorageSlot.sol:StorageSlot",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<StorageSlot$Type["abi"]>>;
}
