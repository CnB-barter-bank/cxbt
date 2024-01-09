import { Address, DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, mainDeployer } = await hre.getNamedAccounts()
  const useDeployer = process.env.DEPLOYER == 'master' ? mainDeployer : deployer
  const {
    deploy,
    deployIfDifferent,
    getOrNull,
    execute,
    read,
    getArtifact,
    getExtendedArtifact,
  } = hre.deployments

  const workers: Address[] = []

  const tokenData = await getOrNull('CXBToken')
  if (!tokenData) {
    console.log('Token is not deployed')
} else {
    console.log('Token is deployed', tokenData.address)
  }

  const purchaseData = await getOrNull('CXBTokenPurchase')
  if (!purchaseData) {
    console.log('Purchase is not deployed')
  } else {
    console.log('Purchase is deployed', purchaseData.address)
  }

  const managerData = await getOrNull('PresaleManager')
  if (!managerData) {
    console.log('Manager is not deployed')
  } else {
    console.log('Manager is deployed', managerData.address)
    const signers = await hre.ethers.getSigners()
    const signer = signers.find(({ address }) => address == useDeployer)
    const manager = await hre.ethers.getContractAt(
        'PresaleManager',
        managerData.address,
        signer
      )
    console.log('Workers:\n', await manager.values())
  }
}
func.id = 'deploy_View' // id required to prevent reexecution
func.tags = ['View']

export default func
