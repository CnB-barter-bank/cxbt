# C&B barter bank and platform smart contracts

Payment tokens
|Token  |Rate  |Address                                   |
 ------ | ---- | ---------------------------------------- |
|Ethereum                                                 |
|EURS   |1.1   |0xdb25f211ab05b1c97d595516f45794528a807ad8|
|EURT   |1.1   |0xc581b735a1688071a1746c968e0798d642ede491|
|AGEUR  |1.1   |0x1a7e4e63778b4f12a199c062f3efdd288afcbce8|
|EURC   |1.1   |0x1abaea1f7c830bd89acc67ec4af516284b1bc33c|
|USDC   |1     |0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48|
|USDT   |1     |0xdac17f958d2ee523a2206206994597c13d831ec7|
|DAI    |1     |0x6b175474e89094c44da98b954eedeac495271d0f|
|TUSD   |1     |0x0000000000085d4780b73119b644ae5ecd22b376|
|USDP   |1     |0x8e870d67f660d95d5be530380d0ec0bd388289e1|
|GUSD   |1     |0x056fd409e1d7a124bd7017459dfea2f387b6d5cd|
|DOLA   |1     |0x865377367054516e17014ccded1e7d814edc9ce4|
|BNB                                                      |
|AGEUR  |1.1   |0x12f31b73d812c6bb0d735a218c086d44d5fe5f89|
|USDT   |1     |0x55d398326f99059ff775485246999027b3197955|
|USDC   |1     |0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d|
|DAI    |1     |0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3|
|TUSD   |1     |0x40af3827f39d0eacbf4a168f8d4ee67c121d11c9|
|DOLA   |1     |0x2f29bc0ffaf9bff337b31cbe6cb5fb3bf12e5840|
|Polygon POS                                              |
|EURS   |1.1   |0xdb25f211ab05b1c97d595516f45794528a807ad8|
|AGEUR  |1.1   |0xe0b52e49357fd4daf2c15e02058dce6bc0057db4|
|USDC   |1     |0x3c499c542cef5e3811e1192ce70d8cc03d5c3359|
|USDT   |1     |0xc2132d05d31c914a87c6611c10748aeb04b58e8f|
|DAI    |1     |0x8f3cf7ad23cd3cadbd9735aff958023239c6a063|
|Avalanche                                                |
|USDT   |1     |0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7|
|EURC   |1.1   |0xc891eb4cbdeff6e073e859e987815ed1505c2acd|
|USDC   |1     |0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e|
|DAI    |1     |0xd586e7f844cea2f87f50152665bcbc2c279d8d70|
|TUSD   |1     |0x1c20e891bab6b1727d14da358fae2984ed9b59eb|
|Tron ???? [TODO]                                         |  
|USDT   |1     |TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t        |
|USDC   |1     |TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8        |
|TUSD   |1     |TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4        |

```shell
npx hardhat vars setup
npx hardhat vars set ETHERSCAN_API_KEY 
npx hardhat vars set INFURA_API_KEY
npx hardhat vars set MNEMONIC
npx hardhat vars set BSCSCAN_API_KEY
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

You need to deploy token first, deploy manager with token's address, and change authority of token to the manager's address