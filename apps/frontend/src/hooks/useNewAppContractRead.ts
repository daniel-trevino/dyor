import { ethers } from 'ethers'
import useContractStore from './useContractStore'
import { paramsToString } from './useMulticallStore'
import { SupportedContracts } from '../lib/contracts'
import { DEFAULT_SMART_CONTRACT_PARAMS } from '../utils/constants'

type ReadResponse = {
  data: ethers.utils.Result | undefined
  fetch: () => Promise<string>
  error: boolean
  loading: boolean | undefined
}

export const useNewAppContractRead = (
  contractName: SupportedContracts,
  methodName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any[] = DEFAULT_SMART_CONTRACT_PARAMS
): ReadResponse => {
  console.log('params here newContract', { params })
  const contractStore = useContractStore({
    contractName,
    methodName,
    params,
    read: true,
  })
  const { loading, data } = contractStore((state) => ({ loading: state.loading, data: state.data }))
  const smartContractKey = `${contractName}-${methodName}-${paramsToString(params)}`

  // contractStore.getState().customCall()
  return {
    data: data ? data[smartContractKey] : undefined,
    fetch: ({ contractName, methodName, params }) =>
      contractStore.getState().customCall({ contractName, methodName, params }),
    loading,
    error: false,
  }
}
