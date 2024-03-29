import { abi as TokenDispenserAbi } from "./../artifacts/contracts/TokenDispenser.sol/TokenDispenser.json";
import hre, { ethers } from "hardhat";

const TOKEN_ADDRESS = "0xCfEB869F69431e42cdB54A4F4f105C19C080A601";
const DISPENSER_ADDRESS = "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B";

async function main() {
  const tokenDispenser = await ethers.getContractAt("TokenDispenser", DISPENSER_ADDRESS);
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
