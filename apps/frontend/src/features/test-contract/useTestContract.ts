import { ethers } from 'ethers'
import { useAppContractRead } from '../../hooks/useAppContractRead'
import { useAppContractWrite } from '../../hooks/useAppContractWrite'

type ReadResponse = {
  data: ethers.utils.Result | undefined
  error: boolean
  loading: boolean | undefined
}

type WriteResponse = {
  data: ethers.providers.TransactionResponse | undefined
  error: boolean
  loading: boolean | undefined
  run: any
}

type UseTestContract = {
  message: ReadResponse
  setMessage: WriteResponse
}

const contractName = 'TestContract'

export const useTestContract = (): UseTestContract => {
  const message = useAppContractRead(contractName, 'message')
  const setMessage = useAppContractWrite(contractName, 'setMessage')

  return {
    message: {
      data: message.data,
      error: message.error,
      loading: message.loading && message.data === undefined,
    },
    setMessage,
  }
}
