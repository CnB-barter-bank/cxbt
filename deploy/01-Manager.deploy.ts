import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types' 

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, mainDeployer } = await hre.getNamedAccounts()
  const useDeployer = process.env.DEPLOYER == 'master' ? mainDeployer : deployer
  const { deploy } = hre.deployments

  const manager = await deploy('PresaleManager', {
    from: useDeployer,
    args: [useDeployer, "0x701b22e638Ec0dF950601609B977637b15Ab01ac", 20],
    log: true,
  }) 

  console.log(`PresaleManager contract: `, manager.address)
}
func.id = 'deploy_PresaleManager' // id required to prevent reexecution
func.tags = ['Manager']

export default func