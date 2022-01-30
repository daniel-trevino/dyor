import { useWagmigochi } from './useWagmigochi'

const WagmigochiStatus: React.FC = () => {
  const { status } = useWagmigochi()

  return status.loading ? <div>Loading...</div> : <div>{status.data}</div>
}

export default WagmigochiStatus
