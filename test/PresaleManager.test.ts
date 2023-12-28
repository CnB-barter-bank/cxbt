import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import { expect } from 'chai'
import { Contract } from 'ethers'
import { ethers, viem } from 'hardhat'
import { zeroAddress } from 'viem'

const START_BONUS = 20
const NEW_BONUS = 40
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
  let token: Contract
  let manager: Contract
  let testToken: Contract
  let owner: HardhatEthersSigner
  let client: HardhatEthersSigner
  let managerAddress
  let tokenAddress
  let testTokenAddress
  beforeEach(async () => {
    owner = await getOwnerAccount()
    client = await getClientAccount()
    token = await ethers.deployContract(
      'CXBToken',
      [owner.address, ethers.parseEther('10000')],
      owner
    )
    manager = await ethers.deployContract(
      'PresaleManager',
      [owner.address, zeroAddress, START_BONUS],
      owner
    )
    testToken = await ethers.deployContract('TestToken', [owner.address], owner)
    tokenAddress = await token.getAddress()
    managerAddress = await manager.getAddress()
    testTokenAddress = await testToken.getAddress()
  })

  it('Should not pause when caller is not an owner', async function () {
    await expect(
      manager.connect(client).getFunction('pause')()
    ).to.be.revertedWithCustomError(manager, 'OwnableUnauthorizedAccount')
  })

  it('Should not change address when not paused', async function () {
    expect(await manager.getToken()).to.equal(zeroAddress)
    await expect(
      manager.defineToken(tokenAddress)
    ).to.be.revertedWithCustomError(manager, 'ExpectedPause')
  })

  it('Should not change address when not an owner called', async function () {
    expect(await manager.getToken()).to.equal(zeroAddress)
    await manager.pause()
    await expect(
      manager.connect(client).getFunction('defineToken')(tokenAddress)
    ).to.be.revertedWithCustomError(manager, 'OwnableUnauthorizedAccount')
  })

  it('Should change address to the another only when paused', async function () {
    expect(await manager.getToken()).to.equal(zeroAddress)
    await manager.pause()
    await expect(manager.defineToken(tokenAddress))
    await manager.unpause()
    expect(await manager.getToken()).to.equal(tokenAddress)
  })

  it('Should correctly set initial bonus', async function () {
    expect(await manager.getBonus()).to.equal(START_BONUS)
  })

  it('Should not change bonus when not an owner called', async function () {
    expect(await manager.getBonus()).to.equal(START_BONUS)
    await manager.pause()
    await expect(
      manager.connect(client).getFunction('setBonus')(NEW_BONUS)
    ).to.be.revertedWithCustomError(manager, 'OwnableUnauthorizedAccount')
  })

  it('Should transfer authority only when paused', async function () {
    expect(await token.setAuthority(managerAddress));
    expect(await token.authority()).to.equal(managerAddress)
    const newManager = await ethers.deployContract(
      'PresaleManager',
      [owner.address, tokenAddress, START_BONUS],
      owner
    )
    const newManagerAddress = await newManager.getAddress() 
    // cannot transfer authority when another address defined
    await expect(
      token.setAuthority(newManagerAddress)
    ).to.be.revertedWithCustomError(token, 'AccessManagedUnauthorized')
    // only when paused
    await expect(
      manager.transferAuthority(newManagerAddress)
    ).to.be.revertedWithCustomError(manager, 'ExpectedPause')
    await manager.pause()
    // token for the authority should be defined
    await expect(manager.transferAuthority(newManagerAddress)).to.be.revertedWithCustomError(manager, 'EmptyToken')
    await manager.defineToken(tokenAddress);
    expect(await manager.getToken()).to.equal(tokenAddress)
    await manager.transferAuthority(newManagerAddress)
    await manager.unpause()
    expect(await token.authority()).to.equal(newManagerAddress)
  })

  it('Should change bonus to  another one only when paused', async function () {
    await expect(manager.setBonus(NEW_BONUS)).to.be.revertedWithCustomError(
      manager,
      'ExpectedPause'
    )
    await manager.pause()
    await expect(manager.setBonus(NEW_BONUS))
    await manager.unpause()
    expect(await manager.getBonus()).to.equal(NEW_BONUS)
  })

  it('Should not to set rate without rights', async function () {
    expect(await manager.getRate(testTokenAddress)).to.equal(0)
    await manager.pause()
    await expect(
      manager.connect(client).getFunction('setRate')(testTokenAddress, 10000)
    ).to.be.revertedWithCustomError(manager, 'OwnableUnauthorizedAccount')
  })

  it('Should process errors during set rate', async function () {
    await manager.pause()
    await expect(manager.setRate(zeroAddress, 1)).to.be.revertedWithCustomError(
      manager,
      'EmptyCurrency'
    )
    await expect(
      manager.setRate(testTokenAddress, 0)
    ).to.be.revertedWithCustomError(manager, 'EmptyRate')
    await expect(
      manager.setRate(testTokenAddress, '20000000000000000000000')
    ).to.be.revertedWithCustomError(manager, 'EmptyToken')
    await expect(manager.defineToken(tokenAddress))
    await expect(
      manager.setRate(testTokenAddress, '20000000000000000000000')
    ).to.be.revertedWithCustomError(manager, 'TooBigRate')
  })

  it('Should set rate to another one only when paused', async function () {
    const newRate = ethers.parseEther('1.2')
    expect(await manager.getRate(testTokenAddress)).to.equal(0)
    await expect(
      manager.setRate(testTokenAddress, ethers.parseEther('1.2'))
    ).to.be.revertedWithCustomError(manager, 'ExpectedPause')
    await manager.pause()
    await expect(manager.defineToken(tokenAddress))
    await expect(manager.setRate(testTokenAddress, newRate))
    await manager.unpause()
    expect(await manager.getRate(testTokenAddress)).to.equal(newRate)
  })
  it('Should not allow to buy tokens if manager have no free tokens', async function () {
    await manager.pause()
    await expect(manager.defineToken(tokenAddress))
    await expect(manager.setRate(testTokenAddress, ethers.parseEther('2')))
    await manager.unpause()
    expect(await token.balanceOf(managerAddress)).to.equal(0)
    await testToken.mint(client, E1000)
    expect(await testToken.balanceOf(client)).to.equal(E1000)

    await testToken.connect(client).getFunction('approve')(managerAddress, E100)
    expect(
      await testToken.allowance(client.address, managerAddress)
    ).to.be.equal(E100)
    await expect(
      manager.connect(client).getFunction('buy')(
        testTokenAddress,
        ethers.parseEther('100')
      )
    ).to.be.revertedWithCustomError(manager, 'UnsufficientManagerBalance')
  })

  it('Should not allow to buy tokens if client have no money', async function () {
    await manager.pause()
    await expect(manager.defineToken(tokenAddress))
    await expect(manager.setRate(testTokenAddress, ethers.parseEther('2')))
    await manager.unpause()
    expect(await testToken.balanceOf(client)).to.equal(0)
    await testToken.connect(client).getFunction('approve')(managerAddress, E100)
    expect(
      await testToken.allowance(client.address, managerAddress)
    ).to.be.equal(E100)
    await expect(
      manager.connect(client).getFunction('buy')(
        testTokenAddress,
        ethers.parseEther('100')
      )
    ).to.be.revertedWithCustomError(manager, 'UnsufficientBalance')
  })

  it('Should buy tokens', async function () {
    await manager.pause()
    await expect(manager.defineToken(tokenAddress))
    await expect(manager.setRate(testTokenAddress, ethers.parseEther('2')))
    await manager.unpause()
    await token.transfer(managerAddress, E1000)
    await testToken.transfer(client, E1000)
    expect(await token.balanceOf(managerAddress)).to.equal(E1000)
    expect(await testToken.balanceOf(client)).to.equal(E1000)
    await testToken.connect(client).getFunction('approve')(managerAddress, E100)
    expect(
      await testToken.allowance(client.address, managerAddress)
    ).to.be.equal(E100)
    await manager.pause()
    await manager.setBonus(0)
    await manager.unpause()
    expect(await manager.getResultAmount(testTokenAddress, E100)).to.be.equal(
      E200
    )
    await manager.pause()
    await manager.setBonus(20)
    await manager.unpause()
    expect(await manager.getResultAmount(testTokenAddress, E100)).to.be.equal(
      E240
    )
    expect(
      await manager.connect(client).getFunction('buy')(testTokenAddress, E100)
    )
    expect(await token.balanceOf(managerAddress)).to.equal(E760)
    expect(await token.balanceOf(client.address)).to.equal(E240)
  })
})
