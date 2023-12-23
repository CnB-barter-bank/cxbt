// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface Time$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "Time",
  "sourceName": "@openzeppelin/contracts/utils/types/Time.sol",
  "abi": [],
  "bytecode": "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220357ff8ea3b7af37a2c1d370d75c6f7dc02fbe5f5638eb3eda1693105f95e0e8e64736f6c63430008140033",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220357ff8ea3b7af37a2c1d370d75c6f7dc02fbe5f5638eb3eda1693105f95e0e8e64736f6c63430008140033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "Time",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Time$Type["abi"]>>;
  export function deployContract(
    contractName: "@openzeppelin/contracts/utils/types/Time.sol:Time",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Time$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "Time",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Time$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "@openzeppelin/contracts/utils/types/Time.sol:Time",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Time$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "Time",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Time$Type["abi"]>>;
  export function getContractAt(
    contractName: "@openzeppelin/contracts/utils/types/Time.sol:Time",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Time$Type["abi"]>>;
}
