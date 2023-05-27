import { ExternalContract } from './contracts.types'

export type CoreTokenContractNames = 'WETH' | 'USDC'

export type CoreContracts = {
  [key in CoreTokenContractNames]: ExternalContract
}

// WETH
export const WETH_ADDRESS: ExternalContract = {
  goerli: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  arbitrum: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
}

export const USDC_ADDRESS: ExternalContract = {
  goerli: '0xaFF4481D10270F50f203E0763e2597776068CBc5', // WEENUS
  arbitrum: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
}

export const coreContracts: CoreContracts = {
  WETH: WETH_ADDRESS,
  USDC: USDC_ADDRESS,
}
