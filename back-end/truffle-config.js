const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()

module.exports = {
  networks: {
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.RINKEBY_RPC_URL)
      },
      network_id: '4',
      skipDryRun: true,
      networkCheckTimeout: 10000
    },
    mainnet: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.MAINNET_RPC_URL)
      },
      network_id: '1',
      skipDryRun: true,
    },
    localhost: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: '0.6.6',
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  plugins: [
    'truffle-plugin-verify'
  ]
}
