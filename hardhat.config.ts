import { HardhatUserConfig, vars } from "hardhat/config";

import "@nomicfoundation/hardhat-ethers";

import "hardhat-deploy";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    kava: {
      url: "http://127.0.0.1:2222",
      accounts: [vars.get("DEPLOYER_PRIVATE_KEY")],
      chainId: 2222,
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    deploy: "./scripts/deploy",
    deployments: "./deployments",
  },
};

export default config;
