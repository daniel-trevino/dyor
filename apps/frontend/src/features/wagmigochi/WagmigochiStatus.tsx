import { useWagmigochi } from './useWagmigochi'

type Props = {
  contractAddress: string
}

const WagmigochiStatus: React.FC<Props> = ({ contractAddress }) => {
  const { status } = useWagmigochi(contractAddress)

  return status.loading ? <div>Loading...</div> : <div>{status.data}</div>
}

export default WagmigochiStatus
