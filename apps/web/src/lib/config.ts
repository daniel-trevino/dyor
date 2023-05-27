import { goerli, type Chain } from 'viem/chains'

type Config = {
  host: string
  defaultNetwork: Chain
  isProduction: boolean
  supportedNetworks: Chain[]
}

const generalConfig = {
  host: process.env.NEXT_PUBLIC_HOST ?? 'http://localhost:3000',
  defaultNetwork: (process.env.NEXT_PUBLIC_NETWORK as unknown as Chain) ?? goerli,
  supportedNetworks: [goerli],
}

const appConfig = {
  isProduction: !generalConfig.host.includes('localhost'),
}

const config: Config = { ...generalConfig, ...appConfig }

export default config
