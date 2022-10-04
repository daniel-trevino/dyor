// eslint-disable-next-line import/no-unresolved
import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultWallets, RainbowKitProvider, darkTheme, Theme } from '@rainbow-me/rainbowkit'
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
import merge from 'lodash.merge'
import React, { useEffect } from 'react'
import config from '../lib/config'
import useLocalStorageStore from '../hooks/useLocalStorageStore'
import useWeb3Store from '../hooks/useWeb3Store'
import useMulticallStore from '../hooks/useMulticallStore'

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

const AppBootstrap: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { init: initLocalStorageStore } = useLocalStorageStore()
  const { init: initWeb3Store } = useWeb3Store()
  const { init: initMulticallStore } = useMulticallStore()

  useEffect(() => {
    initWeb3Store()
    initMulticallStore()
    initLocalStorageStore()
  }, [initMulticallStore, initLocalStorageStore, initWeb3Store])

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={myTheme} chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default AppBootstrap
