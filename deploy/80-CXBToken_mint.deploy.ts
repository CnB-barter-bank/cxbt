import 'hardhat-deploy'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, mainDeployer } = await hre.getNamedAccounts()
  const useDeployer = process.env.DEPLOYER == 'master' ? mainDeployer : deployer
  const { getOrNull, execute, read, getArtifact, getExtendedArtifact } =
    hre.deployments

  const signers = await hre.ethers.getSigners()
  const signer = signers.find(({ address }) => address == useDeployer)

  const tokenData = await getOrNull('CXBToken')
  if (!tokenData) {
    console.log('You need to deploy token first')
    return
  }

  const token = await hre.ethers.getContractAt(
    'CXBToken',
    tokenData.address,
    signer
  ) 
  
  await token
    .mint(signer.address, hre.ethers.parseEther('5000000'))
    .then(async (tx) => await tx.wait())
}
func.id = 'mint_CXBToken' // id required to prevent reexecution
func.tags = ['Mint']

export default func
