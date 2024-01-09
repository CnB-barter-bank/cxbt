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
    console.log('You need to deploy token first')
    return
  }
  /*   console.log('tokenData', tokenData.address)
  const token = await hre.ethers.getContractAt("CXBToken", tokenData.address)

  const chainId = await hre.getChainId()
  console.log('chainid', chainId)
  console.log('token', tokenData.address)
 */
  workers.push(tokenData.address)

  const purchaseData = await getOrNull('CXBTokenPurchase')
  if (purchaseData) {
    workers.push(purchaseData.address)
  }

  const oldManagerData = await getOrNull('PresaleManager')

  const signers = await hre.ethers.getSigners()
  const signer = signers.find(({ address }) => address == useDeployer)

  const token = await hre.ethers.getContractAt(
    'CXBToken',
    tokenData.address,
    signer
  ) 

  const managerDeploy = await deploy('PresaleManager', {
    from: useDeployer,
    args: [useDeployer, workers],
    log: true,
    // proxy: true,
    skipIfAlreadyDeployed: true,
    deterministicDeployment: true,
  })
  console.log(`PresaleManager contract: `, managerDeploy.address)

  if (oldManagerData && oldManagerData.address !==managerDeploy.address) {
    const oldManager = await hre.ethers.getContractAt(
      'PresaleManager',
      oldManagerData.address,
      signer
    )
    await oldManager
      .transferAuthority(managerDeploy.address)
      .then(async (tx) => await tx.wait())
      console.log('Old manager data is transferred')
    }
   if ((await token.authority()) == useDeployer) {
    await token
      .setAuthority(managerDeploy.address)
      .then(async (tx) => await tx.wait())
      console.log('Token authority is assigned')
    }else {
      console.log('Token authority is ', await token.authority())
    }
     
  if (purchaseData) {
    const purchase = await hre.ethers.getContractAt(
      'CXBTokenPurchase',
      purchaseData.address,
      signer
    )
    if ((await purchase.authority()) == useDeployer) {
      await purchase
        .setAuthority(managerDeploy.address)
        .then(async (tx) => await tx.wait())
        console.log('Purchase authority is assigned')
      } else {
        console.log('Purchase authority is ', await purchase.authority())
      }
  } else {console.log('Purchsse is not found')}  
}
func.id = 'deploy_PresaleManager' // id required to prevent reexecution
func.tags = ['Manager']

export default func
