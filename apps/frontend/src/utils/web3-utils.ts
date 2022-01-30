import { ethers, providers } from 'ethers'
import { Chain, defaultChains, InjectedConnector } from 'wagmi'
import config from '../lib/config'
import { getNetworkByChainId, NETWORKS } from '../lib/constants'

// Chains for connectors to support
const chains: Chain[] = [
  ...defaultChains,
  {
    blockExplorers: [],
    id: NETWORKS.localhost.chainId,
    name: NETWORKS.localhost.name,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: NETWORKS.localhost.rpcUrls,
  },
]

export const METAMASK_CONNECTOR = new InjectedConnector({
  chains,
})

export const ONE_SECOND_MS = 1000

// We use FallbackProvider to have some redundancy
// Use QUORUM of 1 because we trust the endpoints and prioritise speed
// STALL_TIMEOUT is how many ms until FallbackProvider will wait until trying the next provider
export const FALLBACK_PROVIDER_CONFIG = {
  STALL_TIMEOUT: ONE_SECOND_MS,
  QUORUM: 1,
}

// Add detectNetwork to JsonRpcBatchProvider
export class StaticJsonRpcBatchProvider extends ethers.providers.JsonRpcBatchProvider {
  detectNetwork = ethers.providers.StaticJsonRpcProvider.prototype.detectNetwork.bind(this)
}

export const createFallbackProvider = (chainId: number): ethers.providers.FallbackProvider => {
  const network = getNetworkByChainId(chainId)
  const fallbackProviderConfigs = network.rpcUrls
    .map((rpcUrl) => new StaticJsonRpcBatchProvider(rpcUrl, chainId))
    .map((provider, i) => ({
      provider,
      priority: i,
      stallTimeout: FALLBACK_PROVIDER_CONFIG.STALL_TIMEOUT,
      weight: 1,
    }))

  return new ethers.providers.FallbackProvider(
    fallbackProviderConfigs,
    FALLBACK_PROVIDER_CONFIG.QUORUM
  )
}

export const defaultProvider = ({
  chainId,
}): ethers.providers.FallbackProvider | providers.InfuraProvider => {
  const normalizedChain =
    chainId === undefined ? NETWORKS[config.DEFAULT_NETWORK_NAME].chainId : chainId

  return createFallbackProvider(normalizedChain)
}
