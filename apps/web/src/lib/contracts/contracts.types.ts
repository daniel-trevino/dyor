import chains from 'viem/chains'
import { CoreTokenContractNames } from './core-contracts'

export type ChainNames = keyof typeof chains

export type ExternalContract = {
  [key in ChainNames]?: `0x${string}`
}

export type SupportedContractsNames = CoreTokenContractNames

export type SupportedContracts = {
  [key in SupportedContractsNames]?: ExternalContract
}
