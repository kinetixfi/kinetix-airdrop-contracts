import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const token = await ethers.deployContract("Token", [1_000_000n]);

  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();

  console.log(`Token deployed to ${tokenAddress}`);

  const tokenDispenser = await ethers.deployContract("TokenDispenser", [
    "76234324",
    tokenAddress,
  ]);

  await tokenDispenser.waitForDeployment();

  const tokenDispenserAddress = await tokenDispenser.getAddress();

  console.log(`TokenDispenser ddeploy to ${tokenDispenserAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
