const config = {
  ENVIRONMENT: process.env.ENVIRONMENT ?? 'dev',
  ROUNDED_DECIMALS: 4,
  INFURA_ID: process.env.INFURA_ID ?? undefined,
  DEFAULT_NETWORK_NAME: process.env.DEFAULT_NETWORK_NAME ?? 'localhost',
}

const appConfig = {
  isProduction: config.ENVIRONMENT === 'production',
}

export default { ...config, ...appConfig }
