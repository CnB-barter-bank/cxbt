const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
import { expect } from 'chai'
import { ethers } from 'hardhat'

const encode = (signature) => {
  return ethers.FunctionFragment.from(signature).selector
}

const ETHER_PRICE = 2000000000
const START_BONUS = 20
const NEW_BONUS = 40
const E1 = ethers.parseEther('1')
const E100 = ethers.parseEther('100')
const E120 = ethers.parseEther('120')
const E200 = ethers.parseEther('200')
const E240 = ethers.parseEther('240')
const E760 = ethers.parseEther('760')
const E1000 = ethers.parseEther('1000')
const E2000 = ethers.parseEther('2000')

describe('CXBTokenPurchase', function () {
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
      {value: E100}
    )
    const purchaseAddress = await purchase.getAddress()
    await manager.connect(owner).addWorker(purchaseAddress)
    await purchase.setRate(mockAddress, E1)
    const funcs = [
      'withdraw(address,address)',
      'withdraw(address)',
      'clean(address,address)'
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

  it('Cannot withdraw by other person', async function () { 
    await expect(
      this.purchase.connect(this.client).withdraw(this.client.address)
    ).to.be.revertedWithCustomError(this.purchase, 'AccessManagedUnauthorized')
  })

  it("Withdraw is successful by admin", async function () {
    expect(await ethers.provider.getBalance(this.purchaseAddress)).to.equal(E100);
     const old = await ethers.provider.getBalance(this.referral.address);
    expect( await
      this.purchase.withdraw(this.referral.address)
    )
    expect(await ethers.provider.getBalance(this.purchaseAddress)).to.equal(0);
    expect(
      await ethers.provider.getBalance(this.referral.address)
  ).to.equal(E100 + old);  
  })

  it("Cannot clean by other person", async function () {
    await expect(
      this.purchase.connect(this.client).clean(this.client.address, this.client.address)
    ).to.be.revertedWithCustomError(this.purchase, 'AccessManagedUnauthorized')
  })

  it("Clean is successful by admin", async function () {
    expect( await
      this.purchase.clean(this.owner.address, this.referral.address)
    )
  }) 
})
