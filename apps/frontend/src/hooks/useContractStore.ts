import create from 'zustand'
import { ContractCallContext } from 'ethereum-multicall'
import { BigNumber, Contract, providers, UnsignedTransaction } from 'ethers'
import { useEffect } from 'react'
import useMulticallStore from './useMulticallStore'
import useWeb3Store from './useWeb3Store'
import { SupportedContracts } from '../lib/contracts'
import { SendTransactionReturn, TransactionReceipt } from '../utils/web3.types'
import { DEFAULT_SMART_CONTRACT_PARAMS } from '../utils/constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Abi = any[]

export type Factory = {
  connect: (
    address: string,
    provider: providers.FallbackProvider | providers.JsonRpcSigner
  ) => Contract
  abi: Abi
}

type SendTransactionOptions = {
  minimumGasLimit?: BigNumber
} & UnsignedTransaction

type CallParams = {
  contractName: SupportedContracts
  methodName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any
  read?: boolean
  write?: boolean
  callerOptions?: SendTransactionOptions
}

type ContractStoreState = {
  contract?: Contract
  loading: boolean | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customCall: (params: CallParams) => any
  getWriteContract: (contractName: SupportedContracts) => Contract
  sendTransaction: (params: CallParams) => Promise<SendTransactionReturn | undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  write: (params: any) => Promise<SendTransactionReturn | undefined> | undefined
  setWrite: (params: CallParams) => void
}

export const ContractStore = create<ContractStoreState>((set, get) => ({
  contract: undefined,
  loading: undefined,
  data: undefined,
  write: (): undefined => undefined,
  customCall({
    contractName,
    methodName,
    params = DEFAULT_SMART_CONTRACT_PARAMS,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CallParams): any {
    useMulticallStore.subscribe((state) => {
      set({ loading: true })

      const applicationSmartContracts = useWeb3Store.getState().smartContracts
      const contractAddress = applicationSmartContracts[contractName].address
      const contractAbi = applicationSmartContracts[contractName].abi

      if (state.multicall) {
        if (!contractAddress) throw Error('Smart Contract address must be defined')
        const contractCallContext: ContractCallContext = {
          reference: contractName,
          contractAddress,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          abi: contractAbi as any[],
          calls: [{ reference: methodName, methodName, methodParameters: params }],
        }

        useMulticallStore
          .getState()
          .addCall(contractCallContext)
          .then(() => {
            set({ loading: false })
          })
      }
    })
  },
  getWriteContract(contractName: SupportedContracts): Contract {
    const { signer, smartContracts } = useWeb3Store.getState()
    if (!signer || !contractName) throw Error('Contract not initialized or no Signer')
    const contractAddress = smartContracts[contractName].address
    const { factory } = smartContracts[contractName]
    return factory.connect(contractAddress, signer)
  },
  setWrite({ contractName, methodName, callerOptions = {} }: CallParams): void {
    const { sendTransaction } = get()
    set({
      write: (params) => sendTransaction({ contractName, methodName, callerOptions, params }),
    })
  },
  // eslint-disable-next-line consistent-return
  async sendTransaction({
    contractName,
    methodName,
    callerOptions = {},
    params,
  }: CallParams): Promise<SendTransactionReturn | undefined> {
    const { getWriteContract } = get()
    // Separate custom options
    const { minimumGasLimit, ...unsignedTransaction } = callerOptions

    const options = { ...unsignedTransaction }

    // Craft and send the tx with the signer
    const writeContract = getWriteContract(contractName)
    console.log({ writeContract, params, methodName, options })
    try {
      const { hash } = await writeContract[methodName](...params, options)
      // Wait for tx to resolve with the coreProvider (signer can be seconds slower than coreProvider)
      return { hash, wait: (): Promise<TransactionReceipt> => useWeb3Store.getState().wait(hash) }
    } catch (error) {
      console.log('Error on sendTransaction', error)
    }
  },
}))

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useContractStore = ({
  contractName,
  methodName,
  params,
  read = false,
  write = false,
}: CallParams) => {
  // useEffect(() => {
  //   if (read) {
  //     ContractStore.getState().customCall({ contractName, methodName, params })
  //   }
  // }, [contractName, methodName, read, params])

  useEffect(() => {
    if (write) {
      ContractStore.getState().setWrite({ contractName, methodName })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ContractStore
}

export default useContractStore
