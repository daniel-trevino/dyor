import create from 'zustand'
import { BigNumber, ethers } from 'ethers'
import Onboard, { OnboardAPI, type WalletState } from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { formatUnits } from 'ethers/lib/utils'
import { ChainId, getNetworkByChainId, Network, NETWORKS } from 'shared-constants'
import useLocalStorageStore from './useLocalStorageStore'
import useMulticallStore from './useMulticallStore'
import { ERC20_UNITS } from '../utils/constants'
import numberFormatter from '../utils/numberFormatter'
import { getSmartContracts, SmartContracts } from '../lib/contracts'
import config from '../lib/config'

const { withPrecision } = numberFormatter

export const chainIdToHexString = (chainId: ChainId): string => `0x${chainId.toString(16)}`

type SignerState = {
  ens: WalletState['accounts'][0]['ens'] | undefined
  address: string | undefined
  balance: {
    raw: BigNumber | undefined
    formatted: string | undefined
  }
}

type Web3StoreState = {
  blockNumber: number | undefined
  coreProvider: ethers.providers.FallbackProvider
  currentNetworkId: number | undefined
  signer: ethers.providers.JsonRpcSigner | undefined
  signerState: SignerState | undefined
  onboard: OnboardAPI
  smartContracts: SmartContracts
  init: () => void
  connect: (previouslyConnectedWallet?: string) => Promise<void>
  handleWalletChange: (wallet: WalletState[]) => Promise<void>
  initCoreEventListeners: () => void
  handleNewBlock: (blockNumber: number) => void
}

const SEC_IN_MS = 1000
// We use FallbackProvider to have some redundancy
// Use QUORUM of 1 because we trust the endpoints and prioritise speed
// STALL_TIMEOUT is how many ms until FallbackProvider will wait until trying the next provider
export const FALLBACK_PROVIDER_CONFIG = {
  STALL_TIMEOUT: SEC_IN_MS,
  QUORUM: 1,
}
export const IS_BROWSER = typeof window !== 'undefined'
const { STALL_TIMEOUT, QUORUM } = FALLBACK_PROVIDER_CONFIG

export class StaticJsonRpcBatchProvider extends ethers.providers.JsonRpcBatchProvider {
  detectNetwork = ethers.providers.StaticJsonRpcProvider.prototype.detectNetwork.bind(this)
}

export const createFallbackProvider = (network: Network): ethers.providers.FallbackProvider => {
  const { rpcUrls } = network
  const fallbackProviderConfigs = rpcUrls
    .map((rpcUrl) => new StaticJsonRpcBatchProvider(rpcUrl, network.chainId))
    .map((provider, i) => ({ provider, priority: i, stallTimeout: STALL_TIMEOUT, weight: 1 }))
  return new ethers.providers.FallbackProvider(fallbackProviderConfigs, QUORUM)
}

const injected = injectedModule()

const useWeb3Store = create<Web3StoreState>((set, get) => ({
  blockNumber: undefined,
  coreProvider: createFallbackProvider(NETWORKS[config.DEFAULT_NETWORK_NAME]),
  currentNetworkId: undefined,
  signer: undefined,
  signerState: undefined,
  smartContracts: getSmartContracts(config.DEFAULT_NETWORK_NAME),
  onboard: Onboard({
    // appMetadata: {
    //   name: 'DYOR',
    //   icon: '',
    //   description: 'Web3 Fullstack Starter Kit',
    // },
    wallets: [injected],
    chains: config.SUPPORTED_NETWORKS.map(({ chainId, chainName, rpcUrls }) => ({
      id: chainIdToHexString(chainId),
      label: chainName,
      rpcUrl: rpcUrls[0],
      token: 'ETH',
    })),
  }),
  init(): void {
    const { connect, initCoreEventListeners } = get()

    useLocalStorageStore.subscribe((state, prev) => {
      const { signer } = get()
      const { connectedWallets } = state.storage
      const hasLoadedLocalStorage =
        state.storage.connectedWallets?.length !== prev.storage.connectedWallets?.length

      if (
        hasLoadedLocalStorage &&
        connectedWallets &&
        connectedWallets.length > 0 &&
        typeof signer === 'undefined'
      ) {
        connect(connectedWallets[0])
      }
    })

    initCoreEventListeners()
  },
  connect: async (previouslyConnectedWallet?: string): Promise<void> => {
    const { onboard, handleWalletChange } = get()
    const onboardSettings = previouslyConnectedWallet
      ? { autoSelect: previouslyConnectedWallet }
      : undefined
    const wallets = await onboard.connectWallet(onboardSettings)
    if (wallets && wallets.length > 0) {
      const walletsState = onboard.state.select('wallets')
      handleWalletChange(wallets)

      walletsState.subscribe(() => {
        handleWalletChange(wallets)
      })
    }
  },
  handleWalletChange: async (wallets: WalletState[]): Promise<void> => {
    const { coreProvider } = get()
    try {
      const [wallet] = wallets
      const { ens } = wallet.accounts[0]
      const { id } = wallet.chains[0]
      const signer = new ethers.providers.Web3Provider(wallet.provider).getSigner()
      const signerAddress = await signer.getAddress()
      const signerBalance = await coreProvider.getBalance(signerAddress)
      const connectedWallets = wallets.map(({ label }) => label)
      useLocalStorageStore.getState().setLocalStorage('connectedWallets', connectedWallets)

      const network = getNetworkByChainId(+id)

      const updatedState = {
        signer,
        currentNetworkId: +id,
        smartContracts: getSmartContracts(network.name),
        signerState: {
          ens,
          address: signerAddress,
          balance: {
            formatted: withPrecision(formatUnits(signerBalance.toString(), ERC20_UNITS)),
            raw: signerBalance,
          },
        },
      }

      set(() => updatedState)
    } catch (error) {
      console.log(error)
    }
  },
  initCoreEventListeners(): void {
    const { coreProvider, handleNewBlock } = get()
    coreProvider.on('block', handleNewBlock.bind(this))
    coreProvider.on('error', (error) => {
      console.log('CoreProvider', { error })
    })
  },
  handleNewBlock: (blockNumber: number): void => {
    try {
      set({ blockNumber })
      useMulticallStore.getState().call()
    } catch (error) {
      console.log('Error handling new block', { error })
    }
  },
}))

export default useWeb3Store
