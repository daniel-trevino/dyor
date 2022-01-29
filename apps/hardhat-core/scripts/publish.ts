import * as dotenv from 'dotenv'
import chalk from 'chalk'
import fs from 'fs'
import { folderExists, paths } from './build-utils'

dotenv.config({ path: '../../../.env' })

const deploymentsDir = './deployments'
const publishDir = paths.EXPORTED_GENERATED_CONTRACTS_DIR
const defaultNetwork = process.env.NEXT_PUBLIC_DEFAULT_NETWORK_NAME ?? 'hardhat'

const publishContract = (contractName: string, networkNameDirectory: string): void => {
  if (networkNameDirectory === defaultNetwork) {
    console.log('💽 Publishing', chalk.cyan(contractName), 'to', chalk.gray(publishDir))
    console.log(`🛸 Deployed contract to: ${chalk.magenta(defaultNetwork)}`)
  }
}

const init = async (): Promise<void> => {
  folderExists(publishDir)
  const directories = fs.readdirSync(deploymentsDir)

  directories.forEach((networkNameDirectory) => {
    const files = fs.readdirSync(`${deploymentsDir}/${networkNameDirectory}`)
    files.forEach((file) => {
      if (file.indexOf('.json') >= 0) {
        const contractName = file.replace('.json', '')
        publishContract(contractName, networkNameDirectory)
      }
    })
  })
}

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
