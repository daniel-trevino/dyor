import { useAppContractRead } from '../../hooks/useAppContractRead'

const WagmigochiStatus: React.FC = () => {
  const status = useAppContractRead('WAGMIGOTCHI', 'status')

  return status.loading ? <div>Loading...</div> : <div>{status.data}</div>
}

export default WagmigochiStatus
