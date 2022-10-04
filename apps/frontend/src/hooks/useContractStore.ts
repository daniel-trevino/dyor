import create from 'zustand'
import deepEqual from 'fast-deep-equal'
import cloneDeep from 'clone-deep'
import { Multicall, ContractCallContext, ContractCallReturnContext } from 'ethereum-multicall'
import { CallContext } from 'ethereum-multicall/dist/esm/models'
import { Contract, providers } from 'ethers'
import { useState } from 'react'
import useWeb3Store from './useWeb3Store'
import useMulticallStore from './useMulticallStore'
import { TestContract__factory } from '../../generated/typechain'
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
  data: any | undefined
  customCall: (params: CallParams) => string
}

type CallParams = {
  contractName: SupportedContracts
  address?: string
  methodName: string
}

const store = create<ContractStoreState>((set, get) => ({
  loading: undefined,
  data: undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customCall({ address, contractName, methodName }: CallParams): any {
    useMulticallStore.subscribe((state) => {
      set({ loading: true })

      if (state.multicall) {
        console.log('multicall is ready')
        if (!address) throw Error('address must be defined')

        const contractCallContext: ContractCallContext = {
          reference: contractName,
          contractAddress: address,
          abi: TestContract__factory.abi,
          calls: [{ reference: methodName, methodName, methodParameters: [] }],
          // context: {
          //   contractStore: this,
          // },
        }
        useMulticallStore
          .getState()
          .addCall(contractCallContext)
          .then((res) => {
            if (res) {
              set({ loading: false, data: res })
              console.log('request finished, updating data', { res, state: get() })
            }
          })
      }
    })
  },
}))

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useContractStore = ({ contractName, address, methodName }: CallParams) => {
  useState(() => {
    store.getState().customCall({ contractName, address, methodName })
  })

  return store
}

export default useContractStore
