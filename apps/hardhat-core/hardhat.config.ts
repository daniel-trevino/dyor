import * as dotenv from 'dotenv'
import chalk from 'chalk'
import fs from 'fs'

import '@nomiclabs/hardhat-waffle'
import '@tenderly/hardhat-tenderly'

import 'hardhat-deploy'
import 'hardhat-gas-reporter'

import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-abi-exporter'

dotenv.config({ path: '../../.env' })

// Network you want to deploy to:
const defaultNetwork = process.env.NEXT_PUBLIC_DEFAULT_NETWORK_NAME ?? 'localhost'

const mainnetGwei = 21

function mnemonic(): string {
  try {
    return fs.readFileSync('./mnemonic.txt').toString().trim()
  } catch (e) {
    if (defaultNetwork !== 'localhost') {
      chalk.red(
        '☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`.'
      )
    }
  }
  return ''
}

export default {
  defaultNetwork,

  /**
   * gas reporter configuration that let's you know
   * an estimate of gas for contract deployments and function calls
   * More here: https://hardhat.org/plugins/hardhat-gas-reporter.html
   */
  gasReporter: {
    currency: 'USD',
    coinmarketcap: process.env.COINMARKETCAP || null,
  },

  // if you want to deploy to a testnet, mainnet, or xdai, you will need to configure an Infura key (or similar)
  // See the example.env to see which variable you need to fill up

  networks: {
    localhost: {
      url: 'http://localhost:8545',
      /*      
        notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.RINKEBY_INFURA_KEY}`,
      //    url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/eth/rinkeby", // <---- YOUR MORALIS ID! (not limited to infura)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.KOVAN_INFURA_KEY}`,
      //    url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/eth/kovan", // <---- YOUR MORALIS ID! (not limited to infura)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_MAINNET_INFURA_KEY}`,
      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/mainnet", // <---- YOUR MORALIS ID! (not limited to infura)
      gasPrice: mainnetGwei * 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.ROPSTEN_INFURA_KEY}`,
      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/ropsten",// <---- YOUR MORALIS ID! (not limited to infura)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_GOERLI_INFURA_KEY}`,
      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/goerli", // <---- YOUR MORALIS ID! (not limited to infura)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    xdai: {
      url: 'https://rpc.xdaichain.com/',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    polygon: {
      url: 'https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXx/polygon/mainnet', // <---- YOUR MORALIS ID! (not limited to infura)
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    polytest: {
      url: 'https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/polygon/mumbai', // <---- YOUR MORALIS ID! (not limited to infura)
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com/',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    rinkebyArbitrum: {
      url: 'https://rinkeby.arbitrum.io/rpc',
      gasPrice: 0,
      accounts: {
        mnemonic: mnemonic(),
      },
      companionNetworks: {
        l1: 'rinkeby',
      },
    },
    localArbitrum: {
      url: 'http://localhost:8547',
      gasPrice: 0,
      accounts: {
        mnemonic: mnemonic(),
      },
      companionNetworks: {
        l1: 'localArbitrumL1',
      },
    },
    localArbitrumL1: {
      url: 'http://localhost:7545',
      gasPrice: 0,
      accounts: {
        mnemonic: mnemonic(),
      },
      companionNetworks: {
        l2: 'localArbitrum',
      },
    },
    optimism: {
      url: 'https://mainnet.optimism.io',
      accounts: {
        mnemonic: mnemonic(),
      },
      companionNetworks: {
        l1: 'mainnet',
      },
    },
    kovanOptimism: {
      url: 'https://kovan.optimism.io',
      accounts: {
        mnemonic: mnemonic(),
      },
      companionNetworks: {
        l1: 'kovan',
      },
    },
    localOptimism: {
      url: 'http://localhost:8545',
      accounts: {
        mnemonic: mnemonic(),
      },
      companionNetworks: {
        l1: 'localOptimismL1',
      },
    },
    localOptimismL1: {
      url: 'http://localhost:9545',
      gasPrice: 0,
      accounts: {
        mnemonic: mnemonic(),
      },
      companionNetworks: {
        l2: 'localOptimism',
      },
    },
    localAvalanche: {
      url: 'http://localhost:9650/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43112,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    fujiAvalanche: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnetAvalanche: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    testnetHarmony: {
      url: 'https://api.s0.b.hmny.io',
      gasPrice: 1000000000,
      chainId: 1666700000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnetHarmony: {
      url: 'https://api.harmony.one',
      gasPrice: 1000000000,
      chainId: 1666600000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.5.12',
      },
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  abiExporter: {
    path: '../frontend/abi',
    runOnCompile: true,
    clear: false,
    flat: true,
    only: [],
    spacing: 2,
  },
  ovm: {
    solcVersion: '0.7.6',
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}
