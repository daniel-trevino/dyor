import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { createPublicClient, http } from 'viem'
import { InjectedConnector } from 'wagmi/connectors/injected'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Inter } from '@next/font/google'
import { useEffect } from 'react'

const { chains } = configureChains([mainnet], [publicProvider()])

const config = createConfig({
  autoConnect: false,
  connectors: [new InjectedConnector({ chains })],
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  // Fixes hydratation issues
  // Reference: https://github.com/wagmi-dev/wagmi/issues/542#issuecomment-1479062192
  useEffect(() => {
    config.autoConnect()
  }, [])

  return (
    <main className={`${inter.variable} flex-center h-screen font-sans`}>
      <WagmiConfig config={config}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </WagmiConfig>
    </main>
  )
}

export default MyApp
