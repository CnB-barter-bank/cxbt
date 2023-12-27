import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import { expect } from 'chai'
import { Contract } from 'ethers'
import { ethers } from 'hardhat'
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

describe('CXBToken', function () {
  let token: Contract
  let manager: Contract
  let testToken: Contract
  let owner: HardhatEthersSigner
  let client: HardhatEthersSigner
  let managerAddress
  let tokenAddress
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
    tokenAddress= await token.getAddress();
    managerAddress = await manager.getAddress();
    await token.setAuthority(managerAddress)
    testToken = await ethers.deployContract('TestToken', [owner.address], owner)
    await token.transfer(managerAddress, ethers.parseEther('1000'))
    await testToken.mint(managerAddress, ethers.parseEther('1000'))  
  })

  it('Should use the correct authority', async function () { 
    expect(await token.authority()).to.equal(managerAddress)
  })

  it('Should transfer correctly', async function () {
    const amount = '1000000'
    await token.transfer(client.address, amount)
    expect(await token.balanceOf(client.address)).to.equal(amount)
  })

  it('Should not to freeze without rights', async function () {
    await manager.pause()
    await manager.defineToken(tokenAddress)
    await manager.unpause()
    await expect(
      token.connect(client).getFunction('freeze')(owner.address)
    ).to.be.revertedWithCustomError(token,'AccessManagedUnauthorized')
  })

  it('Should not to transfer funds if one of accounts is freezed', async function () {
    expect(await token.authority()).to.equal(managerAddress)
    await manager.pause()
    await manager.defineToken(tokenAddress)
    await manager.unpause()
    await token.transfer(client.address, E200)
    await token.freeze(owner.address)
    await expect(
      token.connect(client).getFunction('transfer')(owner.address, E100)
    ).to.be.revertedWithCustomError(token,'EnforcedFreeze')
    await expect(token.transfer(client.address, E100)).to.be.revertedWithCustomError(token,
      'EnforcedFreeze'
    )
    await token.unfreeze(owner.address)
    expect(await token.balanceOf(client.address)).to.equal(E200)
    await token.connect(client).getFunction('transfer')(owner.address, E100)
    expect(await token.balanceOf(client.address)).to.equal(E100)
  })
})
