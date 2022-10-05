import useWeb3Store from '../../hooks/useWeb3Store'

const ConnectWalletButton: React.FC = () => {
  const { connect } = useWeb3Store()

  const onConnect = async (): Promise<void> => {
    await connect()
  }

  return (
    <button onClick={onConnect} type="button">
      Connect
    </button>
  )
}

export default ConnectWalletButton
