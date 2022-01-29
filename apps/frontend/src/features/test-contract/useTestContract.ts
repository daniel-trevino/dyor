import { ethers } from 'ethers'
import { useContractRead, useContractWrite } from 'wagmi'
import { LocalContractName } from '../../lib/contracts'
import { getLocalContractAbiFromName } from '../../utils/local-contracts-utils'

type ReadResponse = {
  data: ethers.utils.Result | undefined
  error: Error | undefined
  loading: boolean | undefined
}

type WriteResponse = {
  data: ethers.providers.TransactionResponse | undefined
  error: Error | undefined
  loading: boolean | undefined
  run: any
}

type UseTestContract = {
  message: ReadResponse
  setMessage: WriteResponse
}

export const useTestContract = (
  contractAddress: string,
  contractName: LocalContractName
): UseTestContract => {
  const contractConfig = {
    addressOrName: contractAddress,
    contractInterface: getLocalContractAbiFromName(contractName),
  }

  const [message] = useContractRead(contractConfig, 'message', {
    watch: true,
  })
  const [setMessage, setMessageFunction] = useContractWrite(contractConfig, 'setMessage')

  return {
    message: { data: message.data, error: message.error, loading: message.loading },
    setMessage: {
      run: setMessageFunction,
      data: setMessage.data,
      error: setMessage.error,
      loading: setMessage.loading,
    },
  }
}
