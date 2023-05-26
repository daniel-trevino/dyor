import { Button } from 'ui'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const ConnectButton: React.FC = () => {
  const { isConnected } = useAccount()
  const { connect, connectors, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) return <Button onClick={(): void => disconnect()}>Disconnect</Button>

  return (
    <>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={(): void => connect({ connector })}
        >
          Connect ({connector.name})
          {isLoading && pendingConnector?.id === connector.id && ' (connecting)'}
        </Button>
      ))}
    </>
  )
}

export default ConnectButton
