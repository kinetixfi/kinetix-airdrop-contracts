import { abi as TokenDispenserAbi } from "./../artifacts/contracts/TokenDispenser.sol/TokenDispenser.json";
import hre, { ethers } from "hardhat";

async function main() {
  //const tokenDispenser = await ethers.getContractAt(TokenDispenserAbi, "0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6")
  const tokenDispenser = await ethers.getContractAt(
    "TokenDispenser",
    "0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6"
  );
  const tokenAddress = await tokenDispenser.token();

  const token = await ethers.getContractAt("Token", tokenAddress);

  const programId = await tokenDispenser.programId();

  const totalSupply = await token.totalSupply();

  console.log({ tokenAddress, programId, totalSupply });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
