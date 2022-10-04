import { useNewAppContractRead } from '../../hooks/useNewAppContractRead'

const TestComponent: React.FC = () => {
  const { loading, data } = useNewAppContractRead('TestContract', 'message')

  return loading ? <div>Loading...</div> : <div>{data}</div>
}

export default TestComponent
