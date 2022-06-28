// eslint-disable-next-line import/no-unresolved
import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultWallets, RainbowKitProvider, darkTheme, Theme } from '@rainbow-me/rainbowkit'
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
import merge from 'lodash.merge'
import config from '../lib/config'

const selectedChain = config.isProduction ? chain.mainnet : chain.hardhat
const infuraId = config.isProduction ? config.MAINNET_INFURA_KEY : config.RINKEBY_INFURA_KEY

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#000',
  },
} as Theme)

const { chains, provider } = configureChains(
  [selectedChain],
  [infuraProvider({ infuraId }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'DYOR',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const AppBootstrap: React.FC = ({ children }) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider theme={myTheme} chains={chains}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
)

export default AppBootstrap
