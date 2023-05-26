import { ExternalContract } from './contracts.types'

export type CoreTokenContractNames = 'WETH'

export type CoreContracts = {
  [key in CoreTokenContractNames]: ExternalContract
}

// WETH
export const WETH_ADDRESS: ExternalContract = {
  arbitrumOne: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
}

export const coreContracts: CoreContracts = {
  WETH: WETH_ADDRESS,
}
