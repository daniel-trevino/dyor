import { SupportedNetworks } from './constants'

type ContractAddresses = {
  [key in SupportedNetworks]?: string
}

export type LocalContractName = 'TestContract'

export type SupportedContractName = 'USDC' | 'WAGMIGOTCHI'

export type SupportedErc20Token = 'USDC'

export type SupportedContracts = SupportedContractName | SupportedErc20Token | LocalContractName

export type SupportedContractAddresses = {
  [key in SupportedContracts]: ContractAddresses
}

export const TEST_CONTRACT_ADDRESSES: ContractAddresses = {}

export const WAGMIGOTCHI_ADDRESSES: ContractAddresses = {
  mainnet: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
}

export const USDC_ADDRESSES: ContractAddresses = {
  mainnet: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  ropsten: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
  goerli: '0xaFF4481D10270F50f203E0763e2597776068CBc5',
}

export const supportedContracts: SupportedContractAddresses = {
  USDC: USDC_ADDRESSES,
  WAGMIGOTCHI: WAGMIGOTCHI_ADDRESSES,
  TestContract: TEST_CONTRACT_ADDRESSES,
}

export const getContractAddress = (
  contract: SupportedContracts,
  currentNetwork: SupportedNetworks
): string | undefined => {
  try {
    const supportedContract = supportedContracts[contract]
    return supportedContract[currentNetwork]
  } catch {
    return undefined
  }
}
