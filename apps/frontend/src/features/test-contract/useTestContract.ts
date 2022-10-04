import { ethers } from 'ethers'
import { useContractRead } from 'wagmi'
import { useAppContractWrite } from '../../hooks/useAppContractWrite'
import { getLocalContractAbiFromName } from '../../utils/local-contracts-utils'

type ReadResponse = {
  data: ethers.utils.Result | undefined
  error: boolean
  loading: boolean | undefined
}

type WriteResponse = {
  data: ethers.providers.TransactionResponse | undefined
  error: boolean
  loading: boolean | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run: any
}

type UseTestContract = {
  message: ReadResponse
  setMessage: WriteResponse
}

export const useTestContract = (contractAddress: string): UseTestContract => {
  const contractConfig = {
    addressOrName: contractAddress,
    contractInterface: getLocalContractAbiFromName('TestContract'),
  }
  const { data, isError, isLoading } = useContractRead({
    ...contractConfig,
    functionName: 'message',
    watch: true,
  })

  return {
    message: {
      loading: isLoading,
      data,
    },
  }
}
