import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:pauseCXBToken")
  .addParam("account", "Specify which account [0, 9]")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    const CXBToken = await deployments.get("CXBToken");

    const signers = await ethers.getSigners();

    const token = await ethers.getContractAt("CXBToken", CXBToken.address);

    await token.connect(signers[taskArguments.account]).pause();

    console.log("Paused");
  });

  task("task:unpauseCXBToken")
  .addParam("account", "Specify which account [0, 9]")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    const CXBToken = await deployments.get("CXBToken");

    const signers = await ethers.getSigners();

    const token = await ethers.getContractAt("CXBToken", CXBToken.address);

    await token.connect(signers[taskArguments.account]).unpause();

    console.log("UnPaused");
  });