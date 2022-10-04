import shallow from 'zustand/shallow'
import { useContractRead } from 'wagmi'
import { Multicall, ContractCallContext, ContractCallReturnContext } from 'ethereum-multicall'
import { CallOverrides, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useContractAddress } from './useContractAddress'
import useContractStore from './useContractStore'
import useMulticallStore from './useMulticallStore'
import { SupportedContracts } from '../lib/contracts'
import { getLocalContractAbiFromName } from '../utils/local-contracts-utils'
import { TestContract__factory } from '../../generated/typechain'

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
  const { data: address } = useContractAddress(contractName)
  const contractStore = useContractStore({
    contractName,
    address,
    methodName,
  })
  const { loading, data } = contractStore(
    (state) => ({ loading: state.loading, data: state.data }),
    shallow
  )

  console.log('useNewAppContractRead', { loading, data })
  // const {
  //   data: contractData,
  //   isError,
  //   isLoading,
  // } = useContractRead({
  //   ...contractConfig,
  //   functionName,
  //   watch: true,
  //   ...config,
  // })

  return {
    data,
    loading,
    error: false,
  }
}
