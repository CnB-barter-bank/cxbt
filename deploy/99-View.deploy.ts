import { Address, DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { tokens } from '../src/utils/blockchain'

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

  const currentChainId = Number(await hre.getChainId())

  const chain = tokens.find(({ chainId }) => chainId == currentChainId)

  const readRate = async (contract, token) => {
    if (token.currency == 'main') return new Promise(() => '')
    return await contract.rate(token.address)
  }
  const tokenData = await getOrNull('CXBToken')
  const purchaseData = await getOrNull('CXBTokenPurchase')

  const managerData = await getOrNull('PresaleManager')
  if (!tokenData) {
    console.log('Token is not deployed')
  } else {
    console.log('Token is deployed', tokenData.address)
    const signers = await hre.ethers.getSigners()
    const signer = signers.find(({ address }) => address == useDeployer)
    const token = await hre.ethers.getContractAt(
      'CXBToken',
      tokenData.address,
      signer
    )
    if (purchaseData) {
    console.log(
      'Purchase balance',
      await token.balanceOf(purchaseData!.address)
    )} else {
      console.log("Purchase balance is not available yet")
    }
  }

  if (!purchaseData) {
    console.log('Purchase is not deployed')
  } else {
    console.log('Purchase is deployed', purchaseData.address)
    const signers = await hre.ethers.getSigners()
    const signer = signers.find(({ address }) => address == useDeployer)
    const purchase = await hre.ethers.getContractAt(
      'CXBTokenPurchase',
      purchaseData.address,
      signer
    )
    console.log('Purchase authority is set? ', await purchase.authority() ==  managerData!.address)
    await Promise.all(
      chain!.tokens.map(async (token) =>
        console.log(token.address, await readRate(purchase, token))
      )
    )

    // await purchase.setToken(tokenData!.address).then(async tx => tx.wait())

    // await purchase.setRate('0xe5118E47e061ab15Ca972D045b35193F673bcc36', hre.ethers.parseEther('1')).then( async tx => await tx.wait())
    // await purchase.setRate('0xEbCC972B6B3eB15C0592BE1871838963d0B94278','1000000').then( async tx => await tx.wait())
    // console.log(
    //   'rate 0xe5118E47e061ab15Ca972D045b35193F673bcc36',
    //   await purchase.rate('0xe5118E47e061ab15Ca972D045b35193F673bcc36'),
    //   await purchase.calculateAmount(
    //     '0xe5118E47e061ab15Ca972D045b35193F673bcc36',
    //     1
    //   )
    // )
    // console.log(
    //   'rate 0xEbCC972B6B3eB15C0592BE1871838963d0B94278',
    //   await purchase.rate('0xEbCC972B6B3eB15C0592BE1871838963d0B94278'),
    //   await purchase.calculateAmount(
    //     '0xEbCC972B6B3eB15C0592BE1871838963d0B94278',
    //     1
    //   )
    // )
    // await purchase.withdraw

    /*     console.log('balance before', await hre.ethers.provider.getBalance(purchaseData.address))
    await purchase.withdraw(deployer).then(async tx=>await tx.wait())
    console.log('balance after', await hre.ethers.provider.getBalance(purchaseData.address)) */
  }

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
