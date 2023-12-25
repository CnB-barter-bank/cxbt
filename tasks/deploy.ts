import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:deployCXBToken")
  .addParam("greeting", "Say hello, be nice")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers = await ethers.getSigners();
    const tokenFactory = await ethers.getContractFactory("CXBToken");
    const token = await tokenFactory.connect(signers[0]).deploy(taskArguments.greeting);
    await token.waitForDeployment();
    console.log("CXBToken deployed to: ", await token.getAddress());
  });