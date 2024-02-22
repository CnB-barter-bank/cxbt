import { Address, DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { tokens,   mul10bn } from '../src/utils/blockchain'
import { erc20Abi, zeroAddress } from 'viem' 

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, mainDeployer } = await hre.getNamedAccounts()
  const useDeployer = process.env.DEPLOYER == 'master' ? mainDeployer : deployer
  const { deploy, getOrNull, execute, read, getArtifact, getExtendedArtifact } =
    hre.deployments

  const tokenData = await getOrNull('CXBToken')
  if (!tokenData) {
    console.log('You need to deploy token first')
    return
  }
  const purchaseData = await getOrNull('CXBTokenPurchase')
  if (!purchaseData) {
    console.log('You need to deploy purchase first')
    return
  }


  
  const signers = await hre.ethers.getSigners()
  const signer = signers.find(({ address }) => address == useDeployer)

  const managerData = await getOrNull('PresaleManager')
 

  const bountyDeploy = await deploy('CXBTColdStorage', {
    from: useDeployer,
    args: [
      tokenData.address,
      purchaseData.address,
      managerData.address,
      useDeployer,
    ],
    log: true,
    skipIfAlreadyDeployed: true,
    deterministicDeployment: true,
  })

  console.log(`Bounty contract: `, bountyDeploy.address)
  const bounty = await hre.ethers.getContractAt(
    'CXBTokenBounty',
    bountyDeploy.address,
    signer
  )

  if (!!managerData && managerData.address !== (await bounty.authority())) {
    await bounty.setAuthority(managerData.address)
    console.log('Update authority')
  }
 
  console.log(`Tokens assigned `)

  if (managerData) {
    const managerContract = await hre.ethers.getContractAt(
      'PresaleManager',
      managerData.address,
      signer
    )
    if (!(await managerContract.haveWorker(bountyDeploy.address))) {
      await managerContract
        .addWorker(bountyDeploy.address)
        .then(async (tx) => await tx.wait())
      console.log(`Rights assigned `)
    }
  } else {
    console.log('Manager is not defined')
  }
}
func.id = 'deploy_ColdStorage' // id required to prevent reexecution
func.tags = ['ColdStorage']

export default func
