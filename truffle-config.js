/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

/**
 * @argument location all secrets are stored in the
 * "/keys" directory and created as dotfiles e.g. ".mnemonic"
 */
const getToken = (location) => fs.readFileSync(`keys/${location}`).toString().trim();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const MNEMONIC = getToken('.mnemonic');
const INFURA = getToken('.infura');
const ETHERSCAN = getToken('.etherscan');

module.exports = {
  /**
   * We can define configurations for default directory setup in truffle
   * To enable the use of pre-compilations steps
   */
  contracts_directory: './contracts',
  contracts_build_directory: './build/contracts',
  migrations_directory: './build/migrations',

  /** External configs and enhancements */
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: ETHERSCAN,
  },

  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
      websocket: true,
    },
    ropsten: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://ropsten.infura.io/v3/${INFURA}`),
      network_id: 3, // Ropsten's id
      gas: 6500000, // Ropsten has a lower block limit than mainnet
      networkCheckTimeout: 1000000,
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${INFURA}`),
      network_id: 4,
      gas: 5500000,
      networkCheckTimeout: 1000000,
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false, // Skip dry run before migrations? (default: false for public nets )
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    useColors: true,
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.4', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 2000,
      },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
