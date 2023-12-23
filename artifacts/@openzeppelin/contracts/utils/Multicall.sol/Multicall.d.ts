// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface Multicall$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "Multicall",
  "sourceName": "@openzeppelin/contracts/utils/Multicall.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        }
      ],
      "name": "AddressEmptyCode",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FailedInnerCall",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes[]",
          "name": "data",
          "type": "bytes[]"
        }
      ],
      "name": "multicall",
      "outputs": [
        {
          "internalType": "bytes[]",
          "name": "results",
          "type": "bytes[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "Multicall",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Multicall$Type["abi"]>>;
  export function deployContract(
    contractName: "@openzeppelin/contracts/utils/Multicall.sol:Multicall",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Multicall$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "Multicall",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Multicall$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "@openzeppelin/contracts/utils/Multicall.sol:Multicall",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Multicall$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "Multicall",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Multicall$Type["abi"]>>;
  export function getContractAt(
    contractName: "@openzeppelin/contracts/utils/Multicall.sol:Multicall",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Multicall$Type["abi"]>>;
}
