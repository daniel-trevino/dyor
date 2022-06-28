import { useNetwork } from 'wagmi'
import { NETWORKS, SupportedNetworks } from '../lib/constants'
import { getContractAddress, SupportedContracts } from '../lib/contracts'
import hardhatContracts from '../../generated/contracts/hardhat_contracts.json'
import config from '../lib/config'

type UseContractAddress = {
  data: string | undefined
  loading: boolean
  error: Error | undefined
}

const getLocalContractAddress = (name: SupportedContracts): string | undefined =>
  hardhatContracts[NETWORKS.localhost.chainId][0].contracts[name]?.address

export const useContractAddress = (name: SupportedContracts): UseContractAddress => {
  const { activeChain, isLoading } = useNetwork()

  const chainId = activeChain?.id ?? NETWORKS[config.DEFAULT_NETWORK_NAME].chainId
  const isLocalhost = chainId === NETWORKS.localhost.chainId
  const chainName = (activeChain?.name.toLowerCase() ||
    config.DEFAULT_NETWORK_NAME) as SupportedNetworks

  let contractAddress
  if (chainId) {
    contractAddress = isLocalhost
      ? getLocalContractAddress(name)
      : getContractAddress(name, chainName)
  }

  return {
    data: contractAddress,
    error: new Error(
      `Contract ${name} not found on this network. Make sure DEFAULT_NETWORK_NAME is set correctly`
    ),
    loading: isLoading,
  }
}
