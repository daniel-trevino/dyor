import React from 'react'
import { Button, ButtonProps } from 'ui'
import { useAccount, useConnect } from 'wagmi'
import { METAMASK_CONNECTOR } from '../utils/web3-utils'

type Props = ButtonProps & {
  needsAccount?: boolean
}

const getText = ({
  needsAccount,
  loading,
  account,
  children,
}: {
  needsAccount: boolean
  loading: boolean
  account: string | undefined
  children: React.ReactNode
}): React.ReactNode | string => {
  if (needsAccount && !account) {
    return 'Connect Wallet'
  }

  if (loading) {
    return 'Loading...'
  }

  return children
}

const AppButton: React.FC<Props> = ({
  loading,
  needsAccount = false,
  onClick,
  children,
  ...props
}) => {
  const [account] = useAccount()
  const [, connect] = useConnect()
  const text = getText({ needsAccount, loading, account: account.data?.address, children })

  const onClickWrapper = (): void => {
    if (needsAccount && !account.data) {
      connect(METAMASK_CONNECTOR)
    }
    if (needsAccount && account.data && onClick) {
      onClick()
    }
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button onClick={onClickWrapper} loading={loading} {...props}>
      {text}
    </Button>
  )
}

export default AppButton
