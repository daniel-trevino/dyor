import create from 'zustand'
import { ContractCallContext } from 'ethereum-multicall'
import { Contract, providers } from 'ethers'
import { useState } from 'react'
import useMulticallStore from './useMulticallStore'
import useWeb3Store from './useWeb3Store'
import { SupportedContracts } from '../lib/contracts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Abi = any[]

export type Factory = {
  connect: (
    address: string,
    provider: providers.FallbackProvider | providers.JsonRpcSigner
  ) => Contract
  abi: Abi
}

type ContractStoreState = {
  loading: boolean | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | undefined
  customCall: (params: CallParams) => string
}

type CallParams = {
  contractName: SupportedContracts
  methodName: string
}

const store = create<ContractStoreState>((set, get) => ({
  loading: undefined,
  data: undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customCall({ contractName, methodName }: CallParams): any {
    useMulticallStore.subscribe((state) => {
      set({ loading: true })

      const applicationSmartContracts = useWeb3Store.getState().smartContracts
      const contractAddress = applicationSmartContracts[contractName].address
      const contractAbi = applicationSmartContracts[contractName].abi

      if (state.multicall) {
        if (!contractAddress) throw Error('address must be defined')
        const contractCallContext: ContractCallContext = {
          reference: contractName,
          contractAddress,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          abi: contractAbi as any[],
          calls: [{ reference: methodName, methodName, methodParameters: [] }],
          // context: {
          //   contractStore: this,
          // },
        }
        useMulticallStore
          .getState()
          .addCall(contractCallContext)
          .then((multicallsResult) => {
            if (multicallsResult) {
              const customCallResult =
                multicallsResult.results[contractName].callsReturnContext[0].returnValues[0]

              set({ loading: false, data: customCallResult })
            }
          })
      }
    })
  },
}))

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useContractStore = ({ contractName, methodName }: CallParams) => {
  useState(() => {
    store.getState().customCall({ contractName, methodName })
  })

  return store
}

export default useContractStore
