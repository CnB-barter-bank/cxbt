import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { zeroAddress } from "viem";

const START_BONUS = 20;
const NEW_BONUS = 40;
const E100 = ethers.utils.parseEther("100");
const E200 = ethers.utils.parseEther("200");
const E240 = ethers.utils.parseEther("240");
const E760 = ethers.utils.parseEther("760");
const E1000 = ethers.utils.parseEther("1000");

const getOwnerAccount = async () => {
    const [owner] = await ethers.getSigners();
    return owner;
};

const getClientAccount = async () => {
    const [, client] = await ethers.getSigners();
    return client;
};

describe("CXBToken", function () {
    let token: Contract;
    let manager: Contract;
    let testToken: Contract;
    let owner: SignerWithAddress;
    let client: SignerWithAddress;
    beforeEach(async () => {
        const CXBToken = await ethers.getContractFactory("CXBToken");
        owner = await getOwnerAccount();
        client = await getClientAccount();
        token = await CXBToken.deploy(
            owner.address,
            ethers.utils.parseEther("10000")
        );
        await token.deployed();
        const PresaleManager = await ethers.getContractFactory(
            "PresaleManager"
        );
        manager = await PresaleManager.deploy(
            owner.address,
            zeroAddress,
            START_BONUS
        );
        await manager.deployed();
        await token.setAuthority(manager.address);
        const TestToken = await ethers.getContractFactory("TestToken");
        testToken = await TestToken.deploy(client.address);
        await testToken.deployed();
        await token.transfer(manager.address, ethers.utils.parseEther("1000"));
        await testToken.mint(manager.address, ethers.utils.parseEther("1000"));
    });

    it("Should use the correct authority", async function () {
        expect(await token.authority()).to.equal(manager.address);
    });

    it("Should transfer correctly", async function () {
        const amount = "1000000";
        await token.transfer(client.address, amount);
        expect(await token.balanceOf(client.address)).to.equal(amount);
    });

    it("Should not to freeze without rights", async function () {
        await manager.pause();
        await manager.defineToken(token.address);
        await manager.unpause();
        await expect(
            token.connect(client).freeze(owner.address)
        ).to.be.revertedWith("AccessManagedUnauthorized");
    });

    it("Should not to transfer funds if one of accounts is freezed", async function () {
        expect(await token.authority()).to.equal(manager.address);
        await manager.pause();
        await manager.defineToken(token.address);
        await manager.unpause();
        await token.transfer(client.address, E200);
        await token.freeze(owner.address);
        await expect(
            token.connect(client).transfer(owner.address, E100)
        ).to.be.revertedWith("EnforcedFreeze");
        await expect(token.transfer(client.address, E100)).to.be.revertedWith(
            "EnforcedFreeze"
        );
        await token.unfreeze(owner.address);
        expect(await token.balanceOf(client.address)).to.equal(E200);
        await token.connect(client).transfer(owner.address, E100);
        expect(await token.balanceOf(client.address)).to.equal(E100);
    });
});
