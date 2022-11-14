import { useState } from 'react'
import { useNewAppContractRead } from '../../hooks/useNewAppContractRead'
import { useNewAppContractWrite } from '../../hooks/useNewAppContractWrite'
import useWeb3Store from '../../hooks/useWeb3Store'

const TestComponent: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const { signerState } = useWeb3Store()
  const { loading, data } = useNewAppContractRead('TestContract', 'message')
  const { loading: loadingBalance, data: balance } = useNewAppContractRead('USDC', 'balanceOf', [
    signerState?.address,
  ])
  const { loading: loadingSet, write } = useNewAppContractWrite('TestContract', 'setMessage')

  const onClick = async (): Promise<void> => {
    await write([value])
  }

  if (loading || loadingSet) {
    return <div>Loading...</div>
  }

  console.log({ balance })
  return (
    <div>
      Data is: {data}
      <input onChange={(e): void => setValue(e.target.value)} value={value} />
      <button onClick={onClick} type="button">
        Change data
      </button>
      <div className="mt-4">
        {/* Balance: <span>{loadingBalance ? 'Loading...' : balance}</span> */}
      </div>
    </div>
  )
}

export default TestComponent
