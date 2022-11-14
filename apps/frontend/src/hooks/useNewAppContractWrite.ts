import { ethers } from 'ethers'
import useContractStore from './useContractStore'
import { SupportedContracts } from '../lib/contracts'
import { SendTransactionReturn } from '../utils/web3.types'

type ReadResponse = {
  data: ethers.utils.Result | undefined
  error: boolean
  loading: boolean | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  write: (params: any) => Promise<SendTransactionReturn | undefined> | undefined
}

export const useNewAppContractWrite = (
  contractName: SupportedContracts,
  methodName: string
): ReadResponse => {
  const contractStore = useContractStore({
    contractName,
    methodName,
    write: true,
  })

  const { loading, data, write } = contractStore((state) => ({
    loading: state.loading,
    data: state.data,
    write: state.write,
  }))

  return {
    data,
    loading,
    error: false,
    write,
  }
}
