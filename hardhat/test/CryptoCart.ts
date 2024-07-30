import { expect } from "chai";
import { ContractTransactionResponse } from "ethers";
import { ethers } from "hardhat";
import { CryptoCart } from "../typechain-types";

describe("CryptoCart", () => {
  let contract: CryptoCart & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  let deployer: { address: any }, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();
    const cryptocart = await ethers.getContractFactory("CryptoCart");
    contract = await cryptocart.deploy();
  });

  describe("Deployment", () => {
    it("Should have a owner", async () => {
      const contractOwner = await contract.owner();
      expect(contractOwner).to.equal(deployer.address);
    });

    it("Should have a name", async () => {
      const contractName = await contract.name();
      expect(contractName).to.equal("CryptoCart");
    });
  });
});
