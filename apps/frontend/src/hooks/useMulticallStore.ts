/* eslint-disable @typescript-eslint/no-explicit-any */
import create from 'zustand'
import deepEqual from 'fast-deep-equal'
import cloneDeep from 'clone-deep'
import { Multicall, ContractCallContext, ContractCallReturnContext } from 'ethereum-multicall'
import { CallContext } from 'ethereum-multicall/dist/esm/models'
import useWeb3Store from './useWeb3Store'

function sameMethodAndParams(call0: CallContext, call1: CallContext): boolean {
  return (
    call0.methodName === call1.methodName &&
    JSON.stringify(call0.methodParameters) === JSON.stringify(call1.methodParameters)
  )
}

function generateUniqueCallId(context: ContractCallContext): string {
  return `${context.reference}${context.calls[0].methodName}${JSON.stringify(
    context.calls[0].methodParameters
  )}`
}

type MulticallStoreState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contractCallContexts: ContractCallContext<{ cb: (res: any) => void }>[]
  activeCalls: Set<string>
  multicall?: Multicall
  init: () => void
  call: () => Promise<any>
  addCall: (context: ContractCallContext) => Promise<any>
  removeCall: (contextToRemove: ContractCallContext) => void
}

const useMulticallStore = create<MulticallStoreState>((set, get) => ({
  contractCallContexts: [],
  activeCalls: new Set(),
  multicall: undefined,

  init(): void {
    const multicall = new Multicall({
      ethersProvider: useWeb3Store.getState().coreProvider,
      tryAggregate: true,
      multicallCustomContractAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', // Localhost
    })

    set(() => ({ multicall }))
    console.log('init Multicall', { multicall })
  },
  async call(): Promise<any> {
    console.log('Making a call')
    const { multicall, contractCallContexts } = get()
    try {
      if (!multicall) throw Error('multicall must be initialized')
      const results = await multicall.call(cloneDeep(contractCallContexts))
      return results

      return await multicall
        .call(cloneDeep(contractCallContexts))
        .then((results) => {
          return results

          Object.values(results).forEach((res) => {
            Object.values<ContractCallReturnContext>(res).forEach((val) => {
              const { context } = val.originalContractCallContext
              const { contractStore } = context ?? {}

              if (contractStore !== undefined && typeof contractStore.storage === 'object') {
                val.callsReturnContext.forEach((call) => {
                  const { methodName, returnValues } = call
                  const paramStr = JSON.stringify(call.methodParameters)
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  const curReturnValues = contractStore.storage[methodName][paramStr]
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  if (deepEqual(curReturnValues, returnValues)) return
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  contractStore.storage[methodName][paramStr] = returnValues
                })
              }
            })
          })
        })
        // errors in here won't get caught by try catch
        .catch((error) => {
          console.log('MulticallError', { error })
        })
    } catch (error) {
      console.log('CallError', { error })
      return false
    }
  },
  async addCall(context: ContractCallContext): Promise<any> {
    const { activeCalls, contractCallContexts, call } = get()
    // Check if call is already watched
    const uniqueCallId = generateUniqueCallId(context)
    if (activeCalls.has(uniqueCallId)) return

    // Get contract reference space to add call to
    const contractIndex = contractCallContexts.findIndex(
      (_context) => _context.reference === context.reference
    )

    // If no contract reference space exists, push whole thing
    if (contractIndex === -1) {
      contractCallContexts.push(context)
    } else {
      // Otherwise just push call to existing reference space
      contractCallContexts[contractIndex].calls.push(context.calls[0])
    }

    // Watch call
    activeCalls.add(uniqueCallId)
    const response = await call()
    console.log('addingCall', { response })
    return response
  },
  removeCall(contextToRemove: ContractCallContext): void {
    const { activeCalls, contractCallContexts } = get()
    const uniqueCallIdToRemove = generateUniqueCallId(contextToRemove)
    activeCalls.delete(uniqueCallIdToRemove)

    // Get call to remove, and the contract reference it's stored at
    const callToRemove = contextToRemove.calls[0]
    const contractIndex = contractCallContexts.findIndex(
      (_context) => _context.reference === contextToRemove.reference
    )

    // Remove the call
    contractCallContexts[contractIndex].calls = contractCallContexts[contractIndex].calls.filter(
      (_call) => !sameMethodAndParams(_call, callToRemove)
    )
  },
}))

export default useMulticallStore
