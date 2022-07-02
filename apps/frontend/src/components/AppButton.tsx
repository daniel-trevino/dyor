import { Button, ButtonProps } from 'ui'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

type Props = ButtonProps & {
  needsAccount?: boolean
}

const getText = ({
  loading,
  needsAccount,
  address,
  children,
}: {
  loading?: boolean
  needsAccount: boolean
  address?: string
  children: string
}): string => {
  if (loading) {
    return 'Loading...'
  }

  if (needsAccount && !address) {
    return 'Connect wallet'
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
  const { address } = useAccount()
  const [text, setText] = useState('Loading...')

  useEffect(() => {
    setText(
      getText({
        loading,
        needsAccount,
        address,
        children: children as string,
      })
    )
  }, [needsAccount, loading, address, children])

  const onClickWrapper = (): void => {
    if (onClick) {
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
