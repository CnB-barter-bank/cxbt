import { Address, DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, mainDeployer } = await hre.getNamedAccounts()
  const useDeployer = process.env.DEPLOYER == 'master' ? mainDeployer : deployer
  const {
    deploy, 
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

const oldTokenAuthority = await token.authority();

if (oldTokenAuthority == useDeployer) {
  console.log("Token authority belongs to deployer, transferring")
 await token.setAuthority(managerDeploy.address)
} else if (oldTokenAuthority !=  managerDeploy.address) {
  console.log("Need to move token authority from ", oldTokenAuthority)
} else {
  console.log("Token authority already belongs to manager")
}

let purchase

if (purchaseData) {
  purchase = await hre.ethers.getContractAt(
    'CXBTokenPurchase',
    purchaseData.address,
    signer
  );
  const oldPurchaseAuthority = await purchase.authority();
if (oldPurchaseAuthority == useDeployer) {
  console.log("Purchase authority belongs to deployer, transferring")
 await purchase.setAuthority(managerDeploy.address)
} else if (oldPurchaseAuthority !=  managerDeploy.address) {
  console.log("Need to move Purchase authority from ", oldPurchaseAuthority)
} else {
  console.log("Token authority already belongs to manager")
}
} else {
  console.log('Purchase is not defined yet')
}

 
if (oldTokenAuthority !== useDeployer && oldTokenAuthority !== managerDeploy.address) {
    console.log('Transfer authority from ', oldTokenAuthority)
    const oldManager = await hre.ethers.getContractAt(
      'PresaleManager',
      oldTokenAuthority,
      signer
    )
    console
    await oldManager
      .transferAuthority(managerDeploy.address)
      .then(async (tx) => await tx.wait())
      console.log('Old manager data is transferred')
    } 
} 
func.id = 'deploy_PresaleManager' // id required to prevent reexecution
func.tags = ['Manager']

export default func
