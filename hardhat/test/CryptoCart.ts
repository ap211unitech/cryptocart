import { expect } from "chai";
import { ContractTransactionResponse } from "ethers";
import { ethers } from "hardhat";
import { CryptoCart } from "../typechain-types";
import { tokens } from "../utils";

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

  describe("Product Creation", () => {
    let tx: ContractTransactionResponse;

    const ID = 1;
    const NAME = "Nike Shoes";
    const CATEGORY = "Shoes";
    const IMAGE = "https://tinyurl.com/3e8hh8fa";
    const COST = tokens(0.001);
    const RATING = 4;
    const STOCK = 9;

    beforeEach(async () => {
      tx = await contract.createProduct(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      );
      await tx.wait();
    });

    it("Get Product", async () => {
      const product = await contract.products(ID);
      expect(product[0]).to.equal(ID);
      expect(product[1]).to.equal(NAME);
      expect(product[2]).to.equal(CATEGORY);
    });

    it("Emit ProductCreated event", () => {
      expect(tx).to.emit(contract, "ProductCreated");
    });
  });
});
