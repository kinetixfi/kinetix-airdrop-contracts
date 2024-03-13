import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

import { expect } from "chai";

import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

describe("TokenDispenser", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTokenDispenserFixture() {
    const airdropAmount = parseGwei("100000");

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    //const tokenDispenser = await hre.viem.deployContract("TokenDispenser", []);
    const tokenDispenser = await hre.viem.deployContract("TokenDispenser", [], {
      client: { wallet: owner },
    });

    const publicClient = await hre.viem.getPublicClient();

    return {
      tokenDispenser,
      owner,
      airdropAmount,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { tokenDispenser, owner } = await loadFixture(
        deployTokenDispenserFixture
      );

      expect(await tokenDispenser.read.owner()).to.equal(
        getAddress(owner.account.address)
      );
    });

    // it("Should receive and store the funds to lock", async function () {
    //   const { tokenDispenser, airdropAmount, publicClient } = await loadFixture(
    //     deployTokenDispenserFixture
    //   );

    //   expect(
    //     await publicClient.getBalance({
    //       address: tokenDispenser.address,
    //     })
    //   ).to.equal(airdropAmount);
    // });
  });

  describe("Claims", () => {
    describe("Validations", () => {
      // it("Should revert with the right error if called from another account", async function () {
      //   const { tokenDispenser, otherAccount } = await loadFixture(
      //     deployTokenDispenserFixture
      //   );
      //   const fundAmount = parseGwei("1");
      //   // We can increase the time in Hardhat Network
      //   //await time.increaseTo(unlockTime);
      //   // We retrieve the contract with a different account to send a transaction
      //   const tokenDispenserAsOtherAccount = await hre.viem.getContractAt(
      //     "TokenDispenser",
      //     tokenDispenser.address,
      //     { walletClient: otherAccount }
      //   );
      //   await expect(
      //     tokenDispenserAsOtherAccount.write.fundDispenser([fundAmount])
      //   ).to.be.rejectedWith("You aren't the owner");
      // });
    });

    // describe("Events", () => {
    //   it("Should emit an event on claims", async function () {
    //     const { tokenDispenser, airdropAmount, publicClient } =
    //       await loadFixture(deployTokenDispenserFixture);

    //     //await time.increaseTo(unlockTime);

    //     const hash = await tokenDispenser.write.claimTokens();
    //     await publicClient.waitForTransactionReceipt({ hash });

    //     // get the withdrawal events in the latest block
    //     const claimEvents = await tokenDispenser.getEvents.Claim();
    //     expect(claimEvents).to.have.lengthOf(1);
    //     expect(claimEvents[0].args._amount).to.equal(airdropAmount);
    //   });
    // });
  });
});
