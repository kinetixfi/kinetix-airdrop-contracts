import hre, { ethers } from "hardhat";

const TOKEN_ADDRESS = "0x0290FB167208Af455bB137780163b7B7a9a10C16";
const DISPENSER_ADDRESS = "0x9b1f7F645351AF3631a656421eD2e40f2802E6c0";

async function transferToken() {
  const token = await ethers.getContractAt("Token", TOKEN_ADDRESS);
  const tokenDispenser = await ethers.getContractAt("TokenDispenser", DISPENSER_ADDRESS);

  try {
    await token.transfer(DISPENSER_ADDRESS, 600_000);

    console.log("Transfer successful");
  } catch (error) {
    console.log(error);
  }
}

async function tokenBalances() {
  const token = await ethers.getContractAt("Token", TOKEN_ADDRESS);

  try {
    const balance = await token.balanceOf(DISPENSER_ADDRESS);

    console.log("Balance: " + balance);
  } catch (error) {
    console.log(error);
  }
}

async function addRecipients() {
  const tokenDispenser = await ethers.getContractAt("TokenDispenser", DISPENSER_ADDRESS);

  try {
    await tokenDispenser.addRecipient("0x795f123a911f97fDb53C59bDBB8Df8Ea8381631a", 600);
    await tokenDispenser.addRecipient("0x330bcc8A3eB1BDddfAd9B31b026dba11cfD1930D", 700);
    await tokenDispenser.addRecipient("0xD78491AbDe5Ef499a9be05344266Ad270EAffC91", 700);

    console.log("Add recipient successful");
  } catch (error) {
    console.log(error);
  }
}

async function readContractValues() {
  const tokenDispenser = await ethers.getContractAt("TokenDispenser", DISPENSER_ADDRESS);
  const tokenAddress = await tokenDispenser.token();

  const token = await ethers.getContractAt("Token", tokenAddress);

  if (TOKEN_ADDRESS === tokenAddress) {
    const totalSupply = await token.totalSupply();

    console.log({ info: "Token valid", tokenAddress, totalSupply });
  }

  const programId = await tokenDispenser.programId();

  const testRecipient = await tokenDispenser.recipients("0x795f123a911f97fDb53C59bDBB8Df8Ea8381631a");
  const test2Recipient = await tokenDispenser.recipients("0x330bcc8A3eB1BDddfAd9B31b026dba11cfD1930D");
  const testRecipient3 = await tokenDispenser.recipients("0xD78491AbDe5Ef499a9be05344266Ad270EAffC91");

  console.log({ programId, testRecipient, test2Recipient, testRecipient3 });
}

async function main() {
  try {
    console.log("running...");
    await transferToken();
    await tokenBalances();
    //await addRecipients();
    //await readContractValues();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
