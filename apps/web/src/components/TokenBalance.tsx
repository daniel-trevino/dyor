import { CoreTokenContractNames } from '../lib/contracts/core-contracts'
import useSignerToken from '../lib/hooks/useSignerToken'

type Props = {
  token: CoreTokenContractNames
}

const TokenBalance: React.FC<Props> = () => {
  const { tokenBalanceString, symbol } = useSignerToken('USDC')

  return (
    <div className="text-center">
      <p>
        {tokenBalanceString} {symbol}
      </p>
    </div>
  )
}

export default TokenBalance
