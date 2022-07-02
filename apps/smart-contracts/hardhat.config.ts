import * as dotenv from 'dotenv'
import chalk from 'chalk'
import fs from 'fs'
import '@tenderly/hardhat-tenderly'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-abi-exporter'
import 'hardhat-deploy'
import 'hardhat-gas-reporter'
import { DEFAULT_MNEMONIC, Network, NETWORKS } from 'shared-constants'
import { HDAccountsUserConfig } from 'hardhat/types'

dotenv.config({ path: '../../.env' })

// Network you want to deploy to:
const defaultNetwork = process.env.NEXT_PUBLIC_DEFAULT_NETWORK_NAME ?? NETWORKS.hardhat.name

function mnemonic(): string {
  try {
    return fs.readFileSync('./mnemonic.txt').toString().trim()
  } catch (e) {
    if (defaultNetwork !== NETWORKS.hardhat.name) {
      chalk.red(
        '☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`.'
      )
    }
  }
  return DEFAULT_MNEMONIC
}

const accounts: HDAccountsUserConfig = {
  count: 20,
  initialIndex: 0,
  mnemonic: mnemonic(),
}

const createNetworkConfig = (network: Network) => {
  return {
    accounts,
    chainId: network.chainId,
    url: network.rpcUrls[0],
  }
}

const generateHardhatNetworks = () => {
  return {
    hardhat: {
      accounts,
      chainId: NETWORKS.hardhat.chainId,
      gas: 'auto',
    },
    goerli: createNetworkConfig(NETWORKS.goerli),
    kovan: createNetworkConfig(NETWORKS.kovan),
    rinkeby: createNetworkConfig(NETWORKS.rinkeby),
    ropsten: createNetworkConfig(NETWORKS.ropsten),
  }
}

export default {
  defaultNetwork,
  networks: generateHardhatNetworks(),
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
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
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },
  mocha: {
    timeout: 60000,
  },
}
