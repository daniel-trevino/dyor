import { useContractWrite } from 'wagmi'
import { CallOverrides, ethers } from 'ethers'
import { SupportedContracts } from '../lib/contracts'
import { useContractAddress } from './useContractAddress'
import { getLocalContractAbiFromName } from '../utils/local-contracts-utils'

type WriteResponse = {
  data: ethers.providers.TransactionResponse | undefined
  error: Error | undefined
  loading: boolean | undefined
  run: any
}

type Config = {
  args?: any | any[]
  overrides?: CallOverrides
}

export const useAppContractWrite = (
  contractName: SupportedContracts,
  functionName: string,
  config?: Config
): WriteResponse => {
  const { data } = useContractAddress(contractName)
  const contractConfig = {
    addressOrName: data,
    contractInterface: getLocalContractAbiFromName(contractName),
  }

  const [response, setterFunction] = useContractWrite(contractConfig, functionName, config)

  return {
    run: setterFunction,
    data: response.data,
    error: response.error,
    loading: response.loading,
  }
}
