import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { createPublicClient, http } from 'viem'
import { InjectedConnector } from 'wagmi/connectors/injected'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { cn } from 'ui'
import config from '../lib/config'

const { chains } = configureChains(config.supportedNetworks, [publicProvider()])

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [new InjectedConnector({ chains })],
  publicClient: createPublicClient({
    chain: config.defaultNetwork,
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
    wagmiConfig.autoConnect()
  }, [])

  return (
    <main
      className={cn(
        inter.variable,
        'flex-center h-screen font-sans dark:bg-gray-950 dark:text-slate-50'
      )}
    >
      <WagmiConfig config={wagmiConfig}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </WagmiConfig>
    </main>
  )
}

export default MyApp
