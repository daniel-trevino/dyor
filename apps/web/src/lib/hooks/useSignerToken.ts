import { erc20ABI, useAccount, useContractRead, useNetwork, useToken } from 'wagmi'
import { utils } from 'ethers'
import { decimalPrecision } from 'dyor-utils'
import { CoreTokenContractNames, coreContracts } from '../contracts/core-contracts'
import { ChainNames } from '../contracts/contracts.types'

type UseSignerToken = {
  signerAddress?: `0x${string}`
  tokenBalanceString?: string
  tokenBalance?: bigint
  isError: boolean
  isLoading: boolean
  tokenAddress?: `0x${string}`
  decimals?: number
  name?: string
  symbol?: string
}

/**
 * Returns all necessary ERC20 token information for the current signer
 * @param token - The token name
 */
const useSignerToken = (token: CoreTokenContractNames): UseSignerToken => {
  const { address: signerAddress } = useAccount()
  const { chain } = useNetwork()
  const address = coreContracts[token][chain?.network as ChainNames]
  const {
    data: dataToken,
    isError: isErrorToken,
    isLoading: isLoadingToken,
  } = useToken({
    address,
  })
  const {
    data: tokenBalance,
    isError,
    isLoading,
  } = useContractRead({
    address,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [signerAddress as `0x${string}`],
  })

  return {
    signerAddress,
    tokenBalanceString: tokenBalance
      ? decimalPrecision(utils.formatUnits(tokenBalance, dataToken?.decimals))
      : undefined,
    tokenBalance,
    tokenAddress: address,
    decimals: dataToken?.decimals,
    name: dataToken?.name,
    symbol: dataToken?.symbol,
    isError: isError || isErrorToken,
    isLoading: isLoading || isLoadingToken || !tokenBalance,
  }
}

export default useSignerToken
