import { useEffect, useState } from 'react'
import { Button } from 'ui'
import { useAccount, useConnect } from 'wagmi'
import { getShortAccount } from '../../utils/account-utils'

export const useIsMounted = (): boolean => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

const ConnectWalletButton: React.FC = () => {
  const isMounted = useIsMounted()
  const [{ data, error }, connect] = useConnect()
  const [account, disconnect] = useAccount({
    fetchEns: true,
  })

  if (!isMounted) return null

  const onClick = (connectorItem): void => {
    if (account.data) {
      disconnect()
    } else {
      connect(connectorItem)
    }
  }

  const text = account.data
    ? account.data?.ens?.name || getShortAccount(account.data?.address)
    : 'Connect Wallet'

  return (
    <>
      {data.connectors.map((x) => (
        <Button disabled={isMounted ? !x.ready : false} key={x.id} onClick={(): void => onClick(x)}>
          {text}
          {isMounted ? !x.ready && ' (unsupported)' : ''}
        </Button>
      ))}

      {error && <div>{error?.message ?? 'Failed to connect'}</div>}
    </>
  )
}

export default ConnectWalletButton
