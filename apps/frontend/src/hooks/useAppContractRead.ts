import { useContractRead } from 'wagmi'
import { CallOverrides, ethers } from 'ethers'
import { SupportedContracts } from '../lib/contracts'
import { useContractAddress } from './useContractAddress'
import { getLocalContractAbiFromName } from '../utils/local-contracts-utils'

type ReadResponse = {
  data: ethers.utils.Result | undefined
  error: boolean
  loading: boolean | undefined
}

type Config = {
  args?: any | any[]
  overrides?: CallOverrides
  skip?: boolean
  watch?: boolean
}

export const useAppContractRead = (
  contractName: SupportedContracts,
  functionName: string,
  config?: Config
): ReadResponse => {
  const { data } = useContractAddress(contractName)
  const contractConfig = {
    addressOrName: data,
    contractInterface: getLocalContractAbiFromName(contractName),
  }

  const {
    data: contractData,
    isError,
    isLoading,
  } = useContractRead(contractConfig, functionName, {
    watch: true,
    ...config,
  })

  return {
    data: contractData,
    error: isError,
    loading: isLoading,
  }
}
