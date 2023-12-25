import {Chain} from '@kolirt/vue-web3-auth'

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
            webSocket: ['wss://sepolia']
        },
        public: {
            http: ['https://rpc.sepolia.org'],
            webSocket: ['wss://sepolia']
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


export  const tokens = [
    {
      chainId: 1,
      coin: "0x26522BDb9a943D06D38574679bAe99ad30B6B1E0",
      tokens: [
        { name: 'EURS', address: '0xdb25f211ab05b1c97d595516f45794528a807ad8' },
        { name: 'EURT', address: '0xc581b735a1688071a1746c968e0798d642ede491' },
        { name: 'AGEUR', address: '0x1a7e4e63778b4f12a199c062f3efdd288afcbce8' },
        { name: 'EURC', address: '0x1abaea1f7c830bd89acc67ec4af516284b1bc33c' },
        { name: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
        { name: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
        { name: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f' },
        { name: 'TUSD', address: '0x0000000000085d4780b73119b644ae5ecd22b376' },
        { name: 'USDP', address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1' },
        { name: 'GUSD', address: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd' },
        { name: 'DOLA', address: '0x865377367054516e17014ccded1e7d814edc9ce4' },
      ],
    },
    {
      chainId: 11155111,
      coin: "0x701b22e638Ec0dF950601609B977637b15Ab01ac",
      tokens: [
        { name: 'DAI', address: '0xe5118E47e061ab15Ca972D045b35193F673bcc36' },
        { name: 'USDC', address: '0xEbCC972B6B3eB15C0592BE1871838963d0B94278' },
      ],
    },
    {
      chainId: 43114,
      coin: "0x26522BDb9a943D06D38574679bAe99ad30B6B1E0",
      tokens: [
        { name: 'USDT', address: '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7' },
        { name: 'EURC', address: '0xc891eb4cbdeff6e073e859e987815ed1505c2acd' },
        { name: 'USDC', address: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e' },
        { name: 'DAI', address: '0xd586e7f844cea2f87f50152665bcbc2c279d8d70' },
        { name: 'TUSD', address: '0x1c20e891bab6b1727d14da358fae2984ed9b59eb' },
      ],
    },
    {
      chainId: 137,
      coin: "0x26522BDb9a943D06D38574679bAe99ad30B6B1E0",
      tokens: [
        { name: 'EURS', address: '0xdb25f211ab05b1c97d595516f45794528a807ad8' },
        { name: 'AGEUR', address: '0xe0b52e49357fd4daf2c15e02058dce6bc0057db4' },
        { name: 'USDC', address: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359' },
        { name: 'USDT', address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f' },
        { name: 'DAI', address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063' },
      ],
    },
    {
      chainId: 56,
      tokens: [
        { name: 'AGEUR', address: '0x12f31b73d812c6bb0d735a218c086d44d5fe5f89' },
        { name: 'USDT', address: '0x55d398326f99059ff775485246999027b3197955' },
        { name: 'USDC', address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d' },
        { name: 'DAI', address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3' },
        { name: 'TUSD', address: '0x40af3827f39d0eacbf4a168f8d4ee67c121d11c9' },
        { name: 'DOLA', address: '0x2f29bc0ffaf9bff337b31cbe6cb5fb3bf12e5840' },
      ],
    },
  ]
  