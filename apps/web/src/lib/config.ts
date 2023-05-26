import { SupportedNetworks } from 'dyor-constants'

type Config = {
  host: string
  network: SupportedNetworks
  isProduction: boolean
}

const generalConfig = {
  host: process.env.NEXT_PUBLIC_HOST ?? 'http://localhost:3000',
  network: (process.env.NEXT_PUBLIC_NETWORK as unknown as SupportedNetworks) ?? 'localhost',
}

const appConfig = {
  isProduction: !generalConfig.host.includes('localhost'),
}

const config: Config = { ...generalConfig, ...appConfig }

export default config
