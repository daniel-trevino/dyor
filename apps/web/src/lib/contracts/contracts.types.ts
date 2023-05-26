import { SupportedNetworks } from 'dyor-constants'
import { CoreTokenContractNames } from './core-contracts'

export type ExternalContract = {
  [key in SupportedNetworks]?: string
}

export type SupportedContractsNames = CoreTokenContractNames

export type SupportedContracts = {
  [key in SupportedContractsNames]?: ExternalContract
}
