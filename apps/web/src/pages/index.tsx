import { Heading } from 'ui'
import { useAccount } from 'wagmi'
import dynamic from 'next/dynamic'

const ConnectButton = dynamic(() => import('../components/ConnectButton'), {
  ssr: false,
})

const Web: React.FC = () => {
  const { address } = useAccount()
  return (
    <div className="text-center">
      <Heading animatedGradient>DYOR</Heading>
      {address && <p className="text-2xl">Your address is: {address}</p>}
      <ConnectButton />
    </div>
  )
}

export default Web
