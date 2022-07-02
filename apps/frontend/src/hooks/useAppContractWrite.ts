import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { CallOverrides, ethers } from 'ethers'
import { useContractAddress } from './useContractAddress'
import { SupportedContracts } from '../lib/contracts'
import { getLocalContractAbiFromName } from '../utils/local-contracts-utils'

type WriteResponse = {
  data: ethers.providers.TransactionResponse | undefined
  error: boolean
  loading: boolean | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run: any
}

type Config = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    addressOrName: contractAddress ?? '',
    contractInterface: getLocalContractAbiFromName(contractName),
  }

  const { data, isError, isLoading, write } = useContractWrite({
    ...contractConfig,
    functionName,
    ...config,
  })
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
