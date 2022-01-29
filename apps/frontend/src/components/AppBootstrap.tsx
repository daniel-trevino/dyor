import { Provider } from 'wagmi'
import { defaultProvider, METAMASK_CONNECTOR } from '../utils/web3-utils'

const AppBootstrap: React.FC = ({ children }) => (
  <Provider
    autoConnect
    provider={defaultProvider}
    connectors={[METAMASK_CONNECTOR]}
    connectorStorageKey="dyorWallet"
  >
    {children}
  </Provider>
)

export default AppBootstrap
