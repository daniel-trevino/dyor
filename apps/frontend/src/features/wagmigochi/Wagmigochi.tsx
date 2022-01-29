import WagmigochiStatus from './WagmigochiStatus'
import { useContractAddress } from '../../hooks/useContractAddress'

const Wagmigochi: React.FC = () => {
  const { data, loading } = useContractAddress('WAGMIGOTCHI')

  if (!data || loading) return null

  return <WagmigochiStatus contractAddress={data} />
}

export default Wagmigochi
