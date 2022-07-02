import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run: any
}

type UseTestContract = {
  message: ReadResponse
  setMessage: WriteResponse
}

const contractName = 'TestContract'

export const useTestContract = (): UseTestContract => {
  const [localState, setLocalState] = useState<UseTestContract>({
    message: {
      data: undefined,
      error: false,
      loading: true,
    },
    setMessage: {
      data: undefined,
      error: false,
      loading: true,
      run: () => {},
    },
  })
  const message = useAppContractRead(contractName, 'message')
  const setMessage = useAppContractWrite(contractName, 'setMessage')

  useEffect(() => {
    if (!message.loading && !setMessage.loading) {
      setLocalState({
        message: {
          data: message.data,
          error: message.error,
          loading: message.loading,
        },
        setMessage: {
          data: setMessage.data,
          error: setMessage.error,
          loading: setMessage.loading,
          run: setMessage.run,
        },
      })
    }
  }, [
    setLocalState,
    message.loading,
    message.data,
    message.error,
    setMessage.loading,
    setMessage.data,
    setMessage.error,
    setMessage.run,
  ])

  return localState
}
