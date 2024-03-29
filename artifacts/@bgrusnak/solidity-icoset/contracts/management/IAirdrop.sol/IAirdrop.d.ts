// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface IAirdrop$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "IAirdrop",
  "sourceName": "@bgrusnak/solidity-icoset/contracts/management/IAirdrop.sol",
  "abi": [
    {
      "inputs": [],
      "name": "AirdropIsFinished",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        }
      ],
      "name": "AlreadyRedeemed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CannotReturnFunds",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EmptyToken",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "redeemAmount",
          "type": "uint256"
        }
      ],
      "name": "NotEnoughFunds",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "proof",
          "type": "bytes32[]"
        }
      ],
      "name": "WrongPath",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Redeem",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Vesting",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "cancelAirDrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        },
        {
          "internalType": "bytes32[]",
          "name": "proof",
          "type": "bytes32[]"
        },
        {
          "internalType": "uint256",
          "name": "redeemAmount",
          "type": "uint256"
        }
      ],
      "name": "redeem",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_root",
          "type": "bytes32"
        }
      ],
      "name": "updateMerkleRoot",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        }
      ],
      "name": "updateToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_vesting",
          "type": "address"
        }
      ],
      "name": "updateVesting",
      "outputs": [],
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
    contractName: "IAirdrop",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<IAirdrop$Type["abi"]>>;
  export function deployContract(
    contractName: "@bgrusnak/solidity-icoset/contracts/management/IAirdrop.sol:IAirdrop",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<IAirdrop$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "IAirdrop",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<IAirdrop$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "@bgrusnak/solidity-icoset/contracts/management/IAirdrop.sol:IAirdrop",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<IAirdrop$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "IAirdrop",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<IAirdrop$Type["abi"]>>;
  export function getContractAt(
    contractName: "@bgrusnak/solidity-icoset/contracts/management/IAirdrop.sol:IAirdrop",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<IAirdrop$Type["abi"]>>;
}
