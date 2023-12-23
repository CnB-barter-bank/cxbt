import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, viem } from "hardhat";
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

describe("PresaleManager", function () {
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

    it("Should not pause when caller is not an owner", async function () {
        await expect(manager.connect(client).pause()).to.be.revertedWith(
            "OwnableUnauthorizedAccount"
        );
    });

    it("Should not change address when not paused", async function () {
        expect(await manager.getToken()).to.equal(zeroAddress);
        await expect(manager.defineToken(token.address)).to.be.revertedWith(
            "ExpectedPause"
        );
    });

    it("Should not change address when not an owner called", async function () {
        expect(await manager.getToken()).to.equal(zeroAddress);
        await manager.pause();
        await expect(
            manager.connect(client).defineToken(token.address)
        ).to.be.revertedWith("OwnableUnauthorizedAccount");
    });

    it("Should change address to the another only when paused", async function () {
        expect(await manager.getToken()).to.equal(zeroAddress);
        await manager.pause();
        await expect(manager.defineToken(token.address));
        await manager.unpause();
        expect(await manager.getToken()).to.equal(token.address);
    });

    it("Should correctly set initial bonus", async function () {
        expect(await manager.getBonus()).to.equal(START_BONUS);
    });

    it("Should not change bonus when not an owner called", async function () {
        expect(await manager.getBonus()).to.equal(START_BONUS);
        await manager.pause();
        await expect(
            manager.connect(client).setBonus(NEW_BONUS)
        ).to.be.revertedWith("OwnableUnauthorizedAccount");
    });

    it("Should change bonus to  another one only when paused", async function () {
        await expect(manager.setBonus(NEW_BONUS)).to.be.revertedWith(
            "ExpectedPause"
        );
        await manager.pause();
        await expect(manager.setBonus(NEW_BONUS));
        await manager.unpause();
        expect(await manager.getBonus()).to.equal(NEW_BONUS);
    });

    it("Should not to set rate without rights", async function () {
        expect(await manager.getRate(testToken.address)).to.equal(0);
        await manager.pause();
        await expect(
            manager.connect(client).setRate(testToken.address, 10000)
        ).to.be.revertedWith("OwnableUnauthorizedAccount");
    });

    it("Should process errors during set rate", async function () {
        await manager.pause();
        await expect(manager.setRate(zeroAddress, 1)).to.be.revertedWith(
            "EmptyCurrency"
        );
        await expect(manager.setRate(testToken.address, 0)).to.be.revertedWith(
            "EmptyRate"
        );
        await expect(
            manager.setRate(testToken.address, "20000000000000000000000")
        ).to.be.revertedWith("EmptyToken");
        await expect(manager.defineToken(token.address));
        await expect(
            manager.setRate(testToken.address, "20000000000000000000000")
        ).to.be.revertedWith("TooBigRate");
    });

    it("Should set rate to another one only when paused", async function () {
        const newRate = ethers.utils.parseEther("1.2");
        expect(await manager.getRate(testToken.address)).to.equal(0);
        await expect(
            manager.setRate(testToken.address, ethers.utils.parseEther("1.2"))
        ).to.be.revertedWith("ExpectedPause");
        await manager.pause();
        await expect(manager.defineToken(token.address));
        await expect(manager.setRate(testToken.address, newRate));
        await manager.unpause();
        expect(await manager.getRate(testToken.address)).to.equal(newRate);
    });

    it("Should buy tokens", async function () {
        await manager.pause();
        await expect(manager.defineToken(token.address));
        await expect(
            manager.setRate(testToken.address, ethers.utils.parseEther("2"))
        );
        await manager.unpause();
        expect(await token.balanceOf(manager.address)).to.equal(E1000);
        await testToken.connect(client).approve(manager.address, E100);
        expect(
            await testToken.allowance(client.address, manager.address)
        ).to.be.equal(E100);
        await manager.pause();
        await manager.setBonus(0);
        await manager.unpause();
        expect(
            await manager.getResultAmount(testToken.address, E100)
        ).to.be.equal(E200);
        await manager.pause();
        await manager.setBonus(20);
        await manager.unpause();
        expect(
            await manager.getResultAmount(testToken.address, E100)
        ).to.be.equal(E240);
        expect(await manager.connect(client).buy(testToken.address, E100));
        expect(await token.balanceOf(manager.address)).to.equal(E760);
        expect(await token.balanceOf(client.address)).to.equal(E240);
    });
});
