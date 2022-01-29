import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import chalk from 'chalk'

const contractName = 'TestContract'

const defaultNetwork = process.env.CONTRACT_DEPLOYMENT_NETWORK_NAME ?? 'hardhat'
chalk.magenta(`Deploying to ${defaultNetwork} 🛰`)

const func: DeployFunction = async ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const deployResult = await deploy(contractName, {
    from: deployer,
  })

  deployments.log(
    ' 📄',
    chalk.cyan(contractName),
    'deployed to:',
    chalk.magenta(deployResult.address)
  )
}

export default func

func.tags = [contractName, 'all']
