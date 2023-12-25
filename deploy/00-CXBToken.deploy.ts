import 'hardhat-deploy'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, mainDeployer } = await hre.getNamedAccounts()
  const useDeployer = process.env.DEPLOYER == 'master' ? mainDeployer : deployer
  const { deploy } = hre.deployments
  const token = await deploy('CXBToken', {
    from: useDeployer,
    args: [useDeployer, 5000000],
    log: true,
  })

  console.log(`CXBToken contract: `, token.address)
}

func.id = 'deploy_CXBToken' // id required to prevent reexecution
func.tags = ['CXBToken']

export default func
