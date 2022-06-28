import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { CallOverrides, ethers } from 'ethers'
import { SupportedContracts } from '../lib/contracts'
import { useContractAddress } from './useContractAddress'
import { getLocalContractAbiFromName } from '../utils/local-contracts-utils'

type WriteResponse = {
  data: ethers.providers.TransactionResponse | undefined
  error: boolean
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
  const { data: contractAddress } = useContractAddress(contractName)
  const contractConfig = {
    addressOrName: contractAddress,
    contractInterface: getLocalContractAbiFromName(contractName),
  }

  const { data, isError, isLoading, write } = useContractWrite(contractConfig, functionName, config)
  const { isError: isErrorWaitForTransaction, isLoading: isLoadingWaitTransaction } =
    useWaitForTransaction({
      hash: data?.hash,
    })

  return {
    data,
    error: isError || isErrorWaitForTransaction,
    loading: isLoading || isLoadingWaitTransaction,
    run: write,
  }
}
