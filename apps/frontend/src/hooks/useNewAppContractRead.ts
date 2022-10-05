import { ethers } from 'ethers'
import useContractStore from './useContractStore'
import { SupportedContracts } from '../lib/contracts'

type ReadResponse = {
  data: ethers.utils.Result | undefined
  error: boolean
  loading: boolean | undefined
}

export const useNewAppContractRead = (
  contractName: SupportedContracts,
  methodName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ReadResponse => {
  const contractStore = useContractStore({
    contractName,
    methodName,
  })
  const { loading, data } = contractStore((state) => ({ loading: state.loading, data: state.data }))

  return {
    data,
    loading,
    error: false,
  }
}
