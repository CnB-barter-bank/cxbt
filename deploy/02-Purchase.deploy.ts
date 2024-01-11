import { Address, DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { tokens, chainLinkABI, mul10bn } from '../src/utils/blockchain'
import { erc20Abi } from 'viem'
import { ContractTransactionReceipt } from 'ethers'

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

  const signers = await hre.ethers.getSigners()
  const signer = signers.find(({ address }) => address == useDeployer)

  const managerData = await getOrNull('PresaleManager')

  const currentChainId = Number(await hre.getChainId())

  const chain = tokens.find(({ chainId }) => chainId == currentChainId)

  const assignRate = async (contract, token) => {
    try {
    if (token.currency == 'main') return new Promise(() => {})
    if ((await contract.rate(token.address)) > 0 ) {
      console.log('Token', token.address, ' rate is already defined')
      return new Promise(() => {})
    }
    const tokenContract = new hre.ethers.Contract(
      token.address,
      erc20Abi,
      signer
    )
    console.log('Token contract connected',  token.address)
    const decimals = await tokenContract.decimals()
    const feeData = await hre.ethers.provider.getFeeData()
    const gasPrice = (feeData.maxFeePerGas! * BigInt(250)) / BigInt(100)
    console.log(
      'Assign to address',
      token.address,
      'rate',
      mul10bn(token.rate, decimals),
      'gas price',
      gasPrice
    )
     const done = await contract
      .setRate(token.address, mul10bn(token.rate, decimals), { gasPrice })
      .then(async (tx) => await tx.wait());
      console.log(`Token rate for ${token.address} is defined`)
      return done;
    } catch(e) {
      console.log(e);
      return new Promise(() => {})
    }
  }

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
    skipIfAlreadyDeployed: true,
    deterministicDeployment: true,
  })

  console.log(`Purchase contract: `, purchaseDeploy.address)
  const purchase = await hre.ethers.getContractAt(
    'CXBTokenPurchase',
    purchaseDeploy.address,
    signer
  )

  if (!!managerData && managerData.address !== (await purchase.authority())) {
    await purchase.setAuthority(managerData.address)
    console.log('Update authority')
  }
  console.log('Assign tokens')
   await Promise.allSettled(
     chain!.tokens.map(async (token) => await assignRate(purchase, token))
    )

  console.log(`Tokens assigned `)

  if (managerData) {
    const managerContract = await hre.ethers.getContractAt(
      'PresaleManager',
      managerData.address,
      signer
    )
    if (!(await managerContract.haveWorker(purchaseDeploy.address))) {
      await managerContract
        .addWorker(purchaseDeploy.address)
        .then(async (tx) => await tx.wait())
      console.log(`Rights assigned `)
    }
  } else {
    console.log('Manager is not defined')
  }
}
func.id = 'deploy_PurchaseManager' // id required to prevent reexecution
func.tags = ['Purchase']

export default func
