import { DeployFunction } from 'hardhat-deploy/types'
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
 const managerDeploy = await deploy('PresaleManager', {
    from: useDeployer,
    args: [useDeployer, tokenData.address, 20],
    log: true,
    // proxy: true,
    skipIfAlreadyDeployed: true,
    deterministicDeployment: true,
  }) 

  console.log(`PresaleManager contract: `, managerDeploy.address)
 
/*   const oldAuthority = await token.authority();
  console.log('old authority', oldAuthority)
  if (managerDeploy.address == oldAuthority) {
    console.log('Manager was not changed')
    return
  }
  const manager =  await hre.ethers.getContractAt("PresaleManager", managerDeploy.address);

  console.log('deployer', deployer)
  console.log(
    'manager pause was', await manager.paused()
  )
  await manager.getFunction('pause')()
  console.log(
    'manager pause now', await manager.paused()
  )  */
/*   let trx

  trx = await manager.pause()
 */  // trx = await manager.updateAuthority(token.address, manager.address)
/* 
 await execute(
  'PresaleManager',
  { from: deployer, log: true },
  'pause'
)

  // await trx.wait()
  console.log(
    'manager pause now',
    await read('PresaleManager', { from: deployer, log: true }, 'paused')
  )
 */
  /* 
  console.log('old authority', oldAuthority)
  const oldAuthorityAmount = await read(
    'CXBToken',
    { from: deployer, log: true },
    'balanceOf',
    oldAuthority
  )
  console.log('old authority balance', oldAuthorityAmount)
  const deployerAmount = await read(
    'CXBToken',
    { from: deployer, log: true },
    'balanceOf',
    deployer
  )
  console.log('deployer balance', deployerAmount)
  let newAuthorityAmount = await read(
    'CXBToken',
    { from: deployer, log: true },
    'balanceOf',
    manager.address
  )
  console.log('new authority balance before', newAuthorityAmount)

  const old = await (
    await hre.ethers.getContractFactory('PresaleManager')
  ).attach(oldAuthority)
  //await hre.ethers.getContractAt("PresaleManager", oldAuthority);

  let trx = await old.updateAuthority(token.address, manager.address)

  await trx.wait() */

  /* 
   await execute(
    'CXBToken',
    { from: deployer, log: true },
    'setAuthority',
    manager.address
  )
  await execute(
    'CXBToken',
    { from: deployer, log: true },
    'transfer',
    manager.address,
    deployerAmount
  )
  await execute(
    'CXBToken',
    { from: deployer, log: true },
    'transferFrom',
    oldAuthority,
    manager.address,
    oldAuthorityAmount
  ) 
   newAuthorityAmount = await read(
    'CXBToken',
    { from: deployer, log: true },
    'balanceOf',
    manager.address
  )
  console.log('new authority balance after', newAuthorityAmount)  */
/*   console.log(
    'Changed authority to',
    await read('CXBToken', { from: deployer, log: true }, 'authority')
  ) */
}
func.id = 'deploy_PresaleManager' // id required to prevent reexecution
func.tags = ['Manager']

export default func
