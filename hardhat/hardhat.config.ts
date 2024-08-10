import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const SEPOLIA_ACCOUNT_PRIVATE_KEY = vars.get("SEPOLIA_ACCOUNT_PRIVATE_KEY");
const ALCHEMY_KEY = vars.get("ALCHEMY_KEY");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      accounts: [SEPOLIA_ACCOUNT_PRIVATE_KEY],
    },
  },
};

export default config;
