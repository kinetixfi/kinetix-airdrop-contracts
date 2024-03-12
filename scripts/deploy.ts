import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  const tokenDispenser = await hre.viem.deployContract(
    "TokenDispenser",
    [],
    {}
  );

  console.log(`Token Dispenser deployed to ${tokenDispenser.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
