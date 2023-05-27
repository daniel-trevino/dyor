import { useNetwork, useToken } from 'wagmi'
import { CoreTokenContractNames, coreContracts } from '../lib/contracts/core-contracts'
import { ChainNames } from '../lib/contracts/contracts.types'

type Props = {
  token: CoreTokenContractNames
}

type TokenBalanceRenderProps = {
  address: `0x${string}`
}

const TokenBalanceRender: React.FC<TokenBalanceRenderProps> = ({ address }) => {
  const { data, isError, isLoading } = useToken({
    address,
  })

  if (isLoading) return <div>Fetching token…</div>
  if (isError) return <div>Error fetching token</div>

  return <div>{data?.symbol}</div>
}

const TokenBalance: React.FC<Props> = ({ token }) => {
  const { chain } = useNetwork()

  if (!chain) return null
  const address = coreContracts[token][chain.network as ChainNames]

  if (!address) return null

  return (
    <div className="text-center">
      <TokenBalanceRender address={address} />
    </div>
  )
}

export default TokenBalance
