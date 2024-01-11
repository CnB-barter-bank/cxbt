import { Chain } from '@kolirt/vue-web3-auth'

import { address as sepoliaToken } from '../../deployments/sepolia/CXBToken.json'
import { address as sepoliaPurchase } from '../../deployments/sepolia/CXBTokenPurchase.json'
import { address as avalancheToken } from '../../deployments/avalanche/CXBToken.json'
// import { address as avalanchePurchase } from '../../deployments/avalanche/CXBTokenPurchase.json'
import { address as bscToken } from '../../deployments/bsc/CXBToken.json'
// import { address as bscPurchase } from '../../deployments/bsc/CXBTokenPurchase.json'
import { address as mainnetToken } from '../../deployments/mainnet/CXBToken.json'
// import {address as mainnetPurchase} from '../../deployments/mainnet/CXBTokenPurchase.json'
import { address as polygonMainnetToken } from '../../deployments/polygon-mainnet/CXBToken.json'
// import { address as polygonMainnetPurchase } from '../../deployments/polygon-mainnet/CXBTokenPurchase.json'
import { sha256, toUtf8Bytes } from 'ethers'

export type TokenDataType = {
  name: string
  address: string
  rate: number
  currency: string
}

export type EthAddressType = `0x${string}`

export const sepolia: Chain = {
  id: 11155111,
  name: 'Sepolia testnet',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.org'],
      webSocket: ['wss://sepolia'],
    },
    public: {
      http: ['https://rpc.sepolia.org'],
      webSocket: ['wss://sepolia'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
    default: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
  },
}

// Polygon 137
// Sepolia 11155111
// Eth 1
// Avalanche 43114
// BSC  56

export const tokens = [
  {
    chainId: 1,
    coin: mainnetToken,
    //  purchase: mainnetPurchase,
    chainkink:'0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    tokens: [
      {
        name: 'Ether',
        address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
        rate: 1,
        currency: 'main',
      },
      {
        name: 'EURS',
        address: '0xdb25f211ab05b1c97d595516f45794528a807ad8',
        rate: 1.1,
        currency: 'euro',
      },
      {
        name: 'EURT',
        address: '0xc581b735a1688071a1746c968e0798d642ede491',
        rate: 1.1,
        currency: 'euro',
      },
      {
        name: 'AGEUR',
        address: '0x1a7e4e63778b4f12a199c062f3efdd288afcbce8',
        rate: 1.1,
        currency: 'euro',
      },
      {
        name: 'EURC',
        address: '0x1abaea1f7c830bd89acc67ec4af516284b1bc33c',
        rate: 1.1,
        currency: 'euro',
      },
      {
        name: 'USDC',
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'USDT',
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'DAI',
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'TUSD',
        address: '0x0000000000085d4780b73119b644ae5ecd22b376',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'USDP',
        address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'GUSD',
        address: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'DOLA',
        address: '0x865377367054516e17014ccded1e7d814edc9ce4',
        rate: 1,
        currency: 'usd',
      },
    ],
  },
  {
    chainId: 11155111,
    coin: sepoliaToken,
    chainlink: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
     purchase: sepoliaPurchase,
    tokens: [
      {
        name: 'Ether',
        address: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
        rate: 1,
        currency: 'main',
      },
      {
        name: 'DAI',
        address: '0xe5118E47e061ab15Ca972D045b35193F673bcc36',
        rate: 1.1,
        currency: 'euro',
      },
      {
        name: 'USDC',
        address: '0xEbCC972B6B3eB15C0592BE1871838963d0B94278',
        rate: 1,
        currency: 'usd',
      },
    ],
  },
  {
    chainId: 43114,
    coin: avalancheToken,
    chainlink:  '0x0A77230d17318075983913bC2145DB16C7366156',
    //  purchase: avalanchePurchase,
    tokens: [
      {
        name: 'Avax',
        address: '0x0A77230d17318075983913bC2145DB16C7366156',
        rate: 1,
        currency: 'main',
      },
      {
        name: 'USDT',
        address: '0x0A77230d17318075983913bC2145DB16C7366156',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'EURC',
        address: '0xc891eb4cbdeff6e073e859e987815ed1505c2acd',
        rate: 1.1,
        currency: 'euro',
      },
      {
        name: 'USDC',
        address: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'DAI',
        address: '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'TUSD',
        address: '0x1c20e891bab6b1727d14da358fae2984ed9b59eb',
        rate: 1,
        currency: 'usd',
      },
    ],
  },
  {
    chainId: 137,
    coin: polygonMainnetToken,
    chainlink: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
    //  purchase: polygonMainnetPurchase,
    tokens: [
      {
        name: 'Matic',
        address: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
        rate: 1,
        currency: 'main',
      },
      {
        name: 'EURS',
        address: '0xdb25f211ab05b1c97d595516f45794528a807ad8',
        rate: 1.1,
        currency: 'euro',
      },
      {
        name: 'AGEUR',
        address: '0xe0b52e49357fd4daf2c15e02058dce6bc0057db4',
        rate: 1.1,
        currency: 'euro',
      },
      {
        name: 'USDC',
        address: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'USDT',
        address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'DAI',
        address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
        rate: 1,
        currency: 'usd',
      },
    ],
  },
  {
    chainId: 56,
    coin: bscToken,
    chainlink: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
    //  purchase: bscPurchase,
    tokens: [
      {
        name: 'BNB',
        address: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
        rate: 1,
        currency: 'main',
      },
      {
        name: 'AGEUR',
        address: '0x12f31b73d812c6bb0d735a218c086d44d5fe5f89',
        rate: 1.1,
        currency: 'euro',
      },
      {
        name: 'USDT',
        address: '0x55d398326f99059ff775485246999027b3197955',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'USDC',
        address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'DAI',
        address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'TUSD',
        address: '0x40af3827f39d0eacbf4a168f8d4ee67c121d11c9',
        rate: 1,
        currency: 'usd',
      },
      {
        name: 'DOLA',
        address: '0x2f29bc0ffaf9bff337b31cbe6cb5fb3bf12e5840',
        rate: 1,
        currency: 'usd',
      },
    ],
  },
]

export const encodeFunctionCall = (func: string): string => {
  return sha256(toUtf8Bytes(func)).substring(0, 10)
}

export const abiCalls = {
  CXBTokenPurchase: {
    'withdraw(address)': encodeFunctionCall('withdraw(address)'),
    'withdraw(address,address)': encodeFunctionCall('withdraw(address,address)'),
    'clean(address,address)': encodeFunctionCall('clean(address,address)'),
  },
}

export const chainLinkABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "int256",
        "name": "current",
        "type": "int256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "roundId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "updatedAt",
        "type": "uint256"
      }
    ],
    "name": "AnswerUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "roundId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "startedBy",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startedAt",
        "type": "uint256"
      }
    ],
    "name": "NewRound",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "description",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "roundId",
        "type": "uint256"
      }
    ],
    "name": "getAnswer",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint80",
        "name": "_roundId",
        "type": "uint80"
      }
    ],
    "name": "getRoundData",
    "outputs": [
      {
        "internalType": "uint80",
        "name": "roundId",
        "type": "uint80"
      },
      {
        "internalType": "int256",
        "name": "answer",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "startedAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "updatedAt",
        "type": "uint256"
      },
      {
        "internalType": "uint80",
        "name": "answeredInRound",
        "type": "uint80"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "roundId",
        "type": "uint256"
      }
    ],
    "name": "getTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "latestAnswer",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "latestRound",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "latestRoundData",
    "outputs": [
      {
        "internalType": "uint80",
        "name": "roundId",
        "type": "uint80"
      },
      {
        "internalType": "int256",
        "name": "answer",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "startedAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "updatedAt",
        "type": "uint256"
      },
      {
        "internalType": "uint80",
        "name": "answeredInRound",
        "type": "uint80"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "latestTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "version",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const div10bn = (num:bigint, decimals:number): number => {
  const [str] = num.toString().split('n');
  const b = Number(str.substring(0, str.length-Number(decimals)))
  const a = Number(str.substring(str.length-Number(decimals)))
  return Number(b+ (a > 0 ? '.'+ a : ''))
}

export const mul10bn = (amount: string|number, decimals: number):bigint => {
  const [m, l] = String(amount).split('.', 2)
  if (!l) return BigInt(m + '0'.repeat(Number(decimals)))
  return BigInt(m + l + '0'.repeat(Number(decimals) - l.length))
}
