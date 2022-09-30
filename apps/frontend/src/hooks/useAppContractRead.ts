import { useContractRead } from 'wagmi'
import { CallOverrides, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useContractAddress } from './useContractAddress'
import { SupportedContracts } from '../lib/contracts'
import { getLocalContractAbiFromName } from '../utils/local-contracts-utils'

type ReadResponse = {
  data: ethers.utils.Result | undefined
  error: boolean
  loading: boolean | undefined
}

type Config = {
  overrides?: CallOverrides
  skip?: boolean
  watch?: boolean
}

export const useAppContractRead = (
  contractName: SupportedContracts,
  functionName: string,
  config?: Config
): { message: ReadResponse } => {
  const [localState, setLocalState] = useState<{
    message: ReadResponse
  }>({
    message: {
      data: undefined,
      error: false,
      loading: true,
    },
  })
  const { data } = useContractAddress(contractName)
  const contractConfig = {
    addressOrName: data ?? '',
    contractInterface: getLocalContractAbiFromName(contractName),
  }

  const {
    data: contractData,
    isError,
    isLoading,
  } = useContractRead({
    ...contractConfig,
    functionName,
    watch: true,
    ...config,
  })

  useEffect(() => {
    if (!isLoading) {
      const test: {
        message: ReadResponse
      } = {
        message: {
          data: contractData,
          error: isError,
          loading: isLoading,
        },
      }
      setLocalState(test)
    }
  }, [setLocalState, contractData, isError, isLoading])

  console.log({ contractData, localState })
  return localState
}
