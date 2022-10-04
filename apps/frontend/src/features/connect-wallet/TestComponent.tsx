import { useContractAddress } from '../../hooks/useContractAddress'
import useContractStore from '../../hooks/useContractStore'
import { useNewAppContractRead } from '../../hooks/useNewAppContractRead'

const TestComponent: React.FC = () => {
  const { loading, data } = useNewAppContractRead('TestContract', 'message')

  console.log({ loading, data })
  return loading ? <div>Loading...</div> : <div>Data</div>
}

export default TestComponent
