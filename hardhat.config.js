require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');


const privatekey1 = ""
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [privatekey1]
    },
    BNB: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [privatekey1]
    },
    BSCscan: {
      url: "https://rpc.ankr.com/bsc",
      accounts: [privatekey1]
    },
    Sepolia: {
      url: "https://rpc.sepolia.org",
      accounts: [privatekey1]
    },
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [privatekey1]
    },
    fantom: {  //https://rpc.ftm.tools
      url: "https://rpc.ankr.com/fantom_testnet/1c519f11e555bb7962579a5a3784049247f8cf4403a5436f2e22dd2e7d6e01a0", // https://rpcapi.fantom.network
      accounts: [privatekey1]
    }



  },
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000, // Adjust the number of optimization runs as needed
      },
      evmVersion: "istanbul", // Adjust the EVM version as needed
      viaIR: true, // Enable compiling via IR
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 90000
  },
  etherscan: {

    apiKey: ""//polygon
  },
};

