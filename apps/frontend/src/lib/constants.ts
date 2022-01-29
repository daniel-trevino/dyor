import { utils, BigNumber } from 'ethers'
import config from './config'

export type SupportedNetworks =
  | 'localhost'
  | 'mainnet'
  | 'kovan'
  | 'rinkeby'
  | 'ropsten'
  | 'goerli'
  | 'xdai'
  | 'matic'
  | 'mumbai'
  | 'smartchain'
  | 'smartchaintest'

export type Network = {
  name: SupportedNetworks
  color: string
  chainId: number
  blockExplorer: string
  rpcUrls: string[]
  faucet?: string
  gasPrice?: BigNumber
}

export type Networks = {
  [key in SupportedNetworks]: Network
}

export const NETWORKS: Networks = {
  localhost: {
    name: 'localhost',
    color: '#666666',
    chainId: 31337,
    blockExplorer: '',
    rpcUrls: [`http://localhost:8545`],
  },
  mainnet: {
    name: 'mainnet',
    color: '#ff8b9e',
    chainId: 1,
    rpcUrls: [`https://mainnet.infura.io/v3/${config.INFURA_ID}`],
    blockExplorer: 'https://etherscan.io',
  },
  kovan: {
    name: 'kovan',
    color: '#7003DD',
    chainId: 42,
    rpcUrls: [`https://kovan.infura.io/v3/${config.INFURA_ID}`],
    blockExplorer: 'https://kovan.etherscan.io',
    faucet: 'https://gitter.im/kovan-testnet/faucet', // https://faucet.kovan.network/
  },
  rinkeby: {
    name: 'rinkeby',
    color: '#e0d068',
    chainId: 4,
    rpcUrls: [`https://rinkeby.infura.io/v3/${config.INFURA_ID}`],
    faucet: 'https://faucet.rinkeby.io',
    blockExplorer: 'https://rinkeby.etherscan.io',
  },
  ropsten: {
    name: 'ropsten',
    color: '#F60D09',
    chainId: 3,
    faucet: 'https://faucet.ropsten.be',
    blockExplorer: 'https://ropsten.etherscan.io',
    rpcUrls: [`https://ropsten.infura.io/v3/${config.INFURA_ID}`],
  },
  goerli: {
    name: 'goerli',
    color: '#0975F6',
    chainId: 5,
    faucet: 'https://goerli-faucet.slock.it',
    blockExplorer: 'https://goerli.etherscan.io',
    rpcUrls: [`https://goerli.infura.io/v3/${config.INFURA_ID}`],
    gasPrice: utils.parseUnits('60', 'gwei'),
  },
  xdai: {
    name: 'xdai',
    color: '#48a9a6',
    chainId: 100,
    rpcUrls: ['https://dai.poa.network'],
    faucet: 'https://xdai-faucet.top',
    blockExplorer: 'https://blockscout.com/poa/xdai',
  },
  matic: {
    name: 'matic',
    color: '#2bbdf7',
    chainId: 137,
    rpcUrls: ['https://polygon-rpc.com', 'https://rpc-mainnet.maticvigil.com'],
    faucet: 'https://faucet.matic.network',
    blockExplorer: 'https://polygonscan.com',
    gasPrice: utils.parseUnits('60', 'gwei'),
  },
  mumbai: {
    name: 'mumbai',
    color: '#92D9FA',
    chainId: 80001,
    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
    faucet: 'https://faucet.matic.network',
    blockExplorer: 'https://mumbai-explorer.matic.today',
  },
  smartchain: {
    name: 'smartchain',
    color: '#F0B90B',
    chainId: 56,
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorer: 'https://bscscan.com',
  },
  smartchaintest: {
    name: 'smartchaintest',
    color: '#F0B90B',
    chainId: 97,
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    faucet: 'https://testnet.binance.org/faucet-smart',
    blockExplorer: 'https://testnet.bscscan.com',
  },
}
