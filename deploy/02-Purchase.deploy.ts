import { Address, DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { tokens } from '../src/utils/blockchain'

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

  const tokenData = await getOrNull('CXBToken')
  if (!tokenData) {
    console.log('You need to deploy token first')
    return
  }

  const signers = await hre.ethers.getSigners()
  const signer = signers.find(({ address }) => address == useDeployer)


  /*   console.log('tokenData', tokenData.address)
  const token = await hre.ethers.getContractAt("CXBToken", tokenData.address)

  const chainId = await hre.getChainId()
  console.log('chainid', chainId)
  console.log('token', tokenData.address)
 */

  const managerData = await getOrNull('PresaleManager')

  const currentChainId = await hre.getChainId()

  const chain = tokens.find(({ chainId }) => chainId == currentChainId)

  const purchaseDeploy = await deploy('CXBTokenPurchase', {
    from: useDeployer,
    args: [
      tokenData.address,
      chain!.chainlink,
      1,
      20,
      managerData ? managerData.address : useDeployer,
    ],
    log: true,
    // proxy: true,
    skipIfAlreadyDeployed: true,
    deterministicDeployment: true,
  })

  console.log(`Purchase contract: `, purchaseDeploy.address) 

  if (managerData) {
    const managerContract = await hre.ethers.getContractAt(
      'PresaleManager',
      managerData.address,
      signer
    )
        if (!await managerContract.haveWorker(purchaseDeploy.address)){
    await managerContract.addWorker(purchaseDeploy.address).then(async (tx) => 
     await tx.wait()
    )
      console.log(`Rights assigned `)
  }} else {
    console.log("Manager is not defined")
  }

}
func.id = 'deploy_PurchaseManager' // id required to prevent reexecution
func.tags = ['Purchase']

export default func
