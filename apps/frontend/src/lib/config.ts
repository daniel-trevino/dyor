const config = {
  ENVIRONMENT: process.env.ENVIRONMENT ?? 'dev',
  ROUNDED_DECIMALS: 4,
  MAINNET_INFURA_KEY: process.env.NEXT_PUBLIC_MAINNET_INFURA_KEY ?? undefined,
  GOERLI_INFURA_KEY: process.env.NEXT_PUBLIC_GOERLI_INFURA_KEY ?? undefined,
  RINKEBY_INFURA_KEY: process.env.NEXT_PUBLIC_RINKEBY_INFURA_KEY ?? undefined,
  KOVAN_INFURA_KEY: process.env.NEXT_PUBLIC_KOVAN_INFURA_KEY ?? undefined,
  ROPSTEN_INFURA_KEY: process.env.NEXT_PUBLIC_ROPSTEN_INFURA_KEY ?? undefined,
  DEFAULT_NETWORK_NAME: process.env.NEXT_PUBLIC_DEFAULT_NETWORK_NAME ?? 'localhost',
}

const appConfig = {
  isProduction: config.ENVIRONMENT === 'production',
}

export default { ...config, ...appConfig }
