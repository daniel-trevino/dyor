import useWeb3Store from '../../hooks/useWeb3Store'

const SignerState: React.FC = () => {
  const { signerState } = useWeb3Store()
  if (!signerState) return null

  return (
    <div>
      <div className="mb-2 text-sm font-bold text-gray-700">Signer State:</div>
      <div>{signerState.address}</div>
      <div>{signerState.balance.formatted}</div>
    </div>
  )
}

export default SignerState
