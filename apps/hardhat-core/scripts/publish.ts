import chalk from 'chalk'
import fs from 'fs'
import { folderExists, jsonStringify, paths } from './build-utils'

const deploymentsDir = './deployments'
const publishDir = paths.EXPORTED_GENERATED_CONTRACTS_DIR
const graphDir = '../subgraph'
const graphAbisDir = `${graphDir}/abis`
const graphConfigDirPath = `${graphDir}/config`

const publishContract = (contractName: string, networkNameDirectory: string): boolean => {
  console.log(' 💽 Publishing', chalk.cyan(contractName), 'to', chalk.gray(publishDir))
  try {
    const contractString = fs
      .readFileSync(`${deploymentsDir}/${networkNameDirectory}/${contractName}.json`)
      .toString()
    const contractObject = JSON.parse(contractString)
    const graphConfigPath = `${graphConfigDirPath}/config.json`
    let graphConfig = '{}'
    try {
      if (fs.existsSync(graphConfigPath)) {
        graphConfig = fs.readFileSync(graphConfigPath).toString()
      }
    } catch (e) {
      console.log(e)
    }

    const graphConfigObject = JSON.parse(graphConfig)
    graphConfigObject[`${networkNameDirectory}_${contractName}Address`] = contractObject.address
    // Make sure {graphDir}/config exists
    folderExists(graphConfigDirPath)
    fs.writeFileSync(graphConfigPath, jsonStringify(graphConfigObject))

    // Make sure {graphDir}/abis exists
    folderExists(graphAbisDir)
    fs.writeFileSync(
      `${graphDir}/abis/${networkNameDirectory}_${contractName}.json`,
      jsonStringify(contractObject)
    )

    console.log(`🛸 Published ${chalk.green(contractName)} to the subgraph.`)

    return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.toString().indexOf('no such file or directory') >= 0) {
      console.log(
        chalk.yellow(` ⚠️  Can't publish ${contractName} yet (make sure it getting deployed).`)
      )
      console.error(e)
    } else {
      console.log(e)
      return false
    }
  }

  return false
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
  console.log('✅  Published contracts to the subgraph package.')
}

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
