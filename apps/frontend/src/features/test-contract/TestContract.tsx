import { useContractAddress } from '../../hooks/useContractAddress'
import TestContractMessage from './TestContractMessage'

const contractName = 'TestContract'

const TestContract: React.FC = () => {
  const { data, loading } = useContractAddress(contractName)

  if (!data || loading) return null

  return <TestContractMessage contractAddress={data} contractName={contractName} />
}

export default TestContract
