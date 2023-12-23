import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
    networks: {
        hardhat: {
            gas: 2100000,
            gasPrice: 8000000000,
        },
    },
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
};

export default config;
