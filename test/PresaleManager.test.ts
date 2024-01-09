import { expect } from 'chai'
import { ethers } from 'hardhat'
import { zeroAddress } from 'viem'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'

const encode = (signature) => {
  return ethers.FunctionFragment.from(signature).selector
}
const ETHER_PRICE = 2000000000
const START_BONUS = 20
const NEW_BONUS = 40
const E1 = ethers.parseEther('1')
const E100 = ethers.parseEther('100')
const E200 = ethers.parseEther('200')
const E240 = ethers.parseEther('240')
const E760 = ethers.parseEther('760')
const E1000 = ethers.parseEther('1000')

const getOwnerAccount = async () => {
  const [owner] = await ethers.getSigners()
  return owner
}

const getClientAccount = async () => {
  const [, client] = await ethers.getSigners()
  return client
}

describe('PresaleManager', function () {
  async function fixture() {
    const [owner, client, referral] = await ethers.getSigners()
    const token = await ethers.deployContract(
      'CXBToken',
      [owner.address, ethers.parseEther('10000')],
      owner
    )
    const tokenAddress = await token.getAddress()

    const mock = await ethers.deployContract(
      'MockERC20',
      [ethers.parseEther('10000')],
      owner
    )
    const mockAddress = await mock.getAddress()
    await mock.transfer(client, E1000)
    const manager = await ethers.deployContract(
      'PresaleManager',
      [owner.address, [tokenAddress]],
      owner
    )
    const managerAddress = await manager.getAddress()
    await manager.grantRole(0, owner.address, 0)
    await token.setAuthority(managerAddress)
    const chainlink = await ethers.deployContract(
      'MockChainlink',
      [ETHER_PRICE],
      owner
    )
    const chainlinkAddress = await chainlink.getAddress()
    const purchase = await ethers.deployContract(
      'CXBTokenPurchase',
      [tokenAddress, chainlinkAddress, 1, START_BONUS, managerAddress],
      { value: E100 }
    )
    const purchaseAddress = await purchase.getAddress()
    await manager.connect(owner).addWorker(purchaseAddress)
    await purchase.setRate(mockAddress, E1)
    const funcs = [
      'withdraw(address,address)',
      'withdraw(address)',
      'clean(address,address)',
    ].map(encode)
    await manager.setTargetFunctionRole(purchaseAddress, funcs, 0)
    return {
      owner,
      client,
      token,
      manager,
      purchase,
      managerAddress,
      tokenAddress,
      purchaseAddress,
      chainlink,
      chainlinkAddress,
      mock,
      mockAddress,
      referral,
    }
  }

  beforeEach(async function () {
    Object.assign(this, await loadFixture(fixture))
  })

  it('Should transfer authority only with correct rights', async function () {
    expect(await this.token.authority()).to.equal(this.managerAddress);
    const newManager = await ethers.deployContract(
      'PresaleManager',
      [this.owner.address, [this.tokenAddress]],
      this.owner
    )
    const newManagerAddress = await newManager.getAddress()
    // cannot transfer authority from the different address
    await expect(
      this.token.connect(this.client).setAuthority(newManagerAddress)
    ).to.be.revertedWithCustomError(this.token, 'AccessManagedUnauthorized')
    // token for the authority should be defined
    await expect(
      this.manager.transferAuthority(zeroAddress)
    ).to.be.revertedWithCustomError(this.manager, 'EmptyAuthority')
    // await this.manager.addWorker(this.tokenAddress)
    expect(await this.manager.haveWorker(this.tokenAddress)).to.be.true
    await this.manager.transferAuthority(newManagerAddress)
    expect(await this.token.authority()).to.equal(newManagerAddress) 
    expect(await newManager.haveWorker(this.tokenAddress)).to.be.true 
  })
 
})
