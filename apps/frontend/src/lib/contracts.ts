import { NETWORKS, SupportedNetworks } from 'shared-constants'
import { TestContract__factory } from '../../generated/typechain'
import { Erc20__factory } from '../../generated/typechain/factories/Erc20__factory'
import hardhatContracts from '../../generated/contracts/hardhat_contracts.json'
import { Multicall2__factory } from '../../generated/typechain/factories/Multicall2__factory'

const LOCAL_SMART_CONTRACT = 'localhost'

type ContractAddresses = {
  [key in SupportedNetworks]?: string
}

// Name should have the same as in the Solidity file contract
export type LocalContractName = 'TestContract' | 'Multicall2'

// Name should have the same as in the abi file added to /abi folder
export type SupportedContractName = 'USDC'

export type SupportedErc20Token = 'USDC'

export type SupportedContracts = SupportedContractName | SupportedErc20Token | LocalContractName

export type SupportedContractAddresses = {
  [key in SupportedContracts]: ContractAddresses
}

export type SmartContracts = {
  [key in SupportedContracts]: {
    address: string | undefined
    abi: unknown
  }
}

export const MULTICALL2_CONTRACT_ADDRESSES: ContractAddresses = {
  localhost: LOCAL_SMART_CONTRACT,
  goerli: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  ropsten: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  mainnet: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
}

export const TEST_CONTRACT_ADDRESSES: ContractAddresses = {
  localhost: LOCAL_SMART_CONTRACT,
  goerli: '0x85D217c8370CD0faD2dF1885dBADfA51ba2dD09A',
}

export const USDC_ADDRESSES: ContractAddresses = {
  mainnet: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  ropsten: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
  goerli: '0xaFF4481D10270F50f203E0763e2597776068CBc5',
}

export const supportedContracts: SupportedContractAddresses = {
  USDC: USDC_ADDRESSES,
  TestContract: TEST_CONTRACT_ADDRESSES,
  Multicall2: MULTICALL2_CONTRACT_ADDRESSES,
}

const getLocalContractAddress = (name: SupportedContracts): string | undefined => {
  const localHardhatContracts = hardhatContracts
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return localHardhatContracts[NETWORKS.localhost.chainId][0].contracts[name]?.address
}
// [NETWORKS.localhost.chainId][0].contracts[name]?.address

export const getContractAddress = (
  contract: SupportedContracts,
  currentNetwork: SupportedNetworks
): string | undefined => {
  try {
    const supportedContract = supportedContracts[contract]
    const contractAddress = supportedContract[currentNetwork]
    if (contractAddress === LOCAL_SMART_CONTRACT) {
      return getLocalContractAddress(contract)
    }
    return contractAddress
  } catch {
    return undefined
  }
}

export const getSmartContracts = (currentNetwork: SupportedNetworks): SmartContracts => {
  const contracts: SmartContracts = {
    USDC: {
      address: getContractAddress('USDC', currentNetwork),
      abi: Erc20__factory.abi,
    },
    TestContract: {
      address: getContractAddress('TestContract', currentNetwork),
      abi: TestContract__factory.abi,
    },
    Multicall2: {
      address: getContractAddress('Multicall2', currentNetwork),
      abi: Multicall2__factory.abi,
    },
  }

  return contracts
}
