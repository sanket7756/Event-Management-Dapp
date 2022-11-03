require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY =
  "c233c769330788729bd46d785f93a05aeb45db845946d3ce1abf7886c5776f14";

const POLYGON_RPC_URL = "https://rpc-mumbai.maticvigil.com";

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.7",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      accounts: "remote",
    },
    // rinkeby: {
    // url: RINKEBY_RPC_URL,
    // accounts: [PRIVATE_KEY],
    // chainId: 4,
    // allowUnlimitedContractSize: true,
    // gasPrice: 50000000000,
    // },
    matic: {
      url: POLYGON_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
};
