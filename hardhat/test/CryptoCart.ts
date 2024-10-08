import { expect } from "chai";
import { ContractRunner, ContractTransactionResponse } from "ethers";
import { ethers } from "hardhat";
import { CryptoCart } from "../typechain-types";
import { tokens } from "../utils";

const ID = 1;
const NAME = "Nike Shoes";
const CATEGORY = "Shoes";
const DESCRIPTION =
  "Discover the perfect addition to your lifestyle with this product. Designed with quality and functionality in mind, this product offers exceptional performance, making it a must-have for anyone looking to enhance their everyday experience. Whether you're at home, at work, or on the go, this versatile item is crafted to meet your needs with ease. With a sleek design and durable construction, it blends style and practicality seamlessly. Ideal for both personal use and as a thoughtful gift, our product is sure to impress. Explore the benefits today and experience the difference it can make in your life.";
const IMAGE = "https://tinyurl.com/3e8hh8fa";
const COST = tokens(0.001);
const RATING = 4;
const STOCK = 9;

describe("CryptoCart", () => {
  let contract: CryptoCart & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  let deployer: { address: any }, buyer: { address: any };

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

    beforeEach(async () => {
      tx = await contract.createProduct(
        ID,
        NAME,
        CATEGORY,
        DESCRIPTION,
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

  describe("Product Purchasing", () => {
    let tx: ContractTransactionResponse;

    beforeEach("Purchase product", async () => {
      // Create a product before purchase
      tx = await contract.createProduct(
        ID,
        NAME,
        CATEGORY,
        DESCRIPTION,
        IMAGE,
        COST,
        RATING,
        STOCK
      );
      await tx.wait();

      tx = await contract
        .connect(buyer as unknown as ContractRunner)
        .purchaseProduct(ID, { value: COST });
      await tx.wait();
    });

    it("Get contract balance", async () => {
      const contractAddress = await contract.getAddress();
      const balance = await ethers.provider.getBalance(contractAddress);
      expect(balance).to.equal(COST);
    });

    it("Updates Order count", async () => {
      const orderCount = await contract.orderCount(buyer.address);
      expect(orderCount).to.equal(1);
    });

    it("Adds new order", async () => {
      const orderCount = await contract.orderCount(buyer.address);
      const order = await contract.orders(buyer.address, orderCount);
      expect(order.time).to.be.greaterThan(0);
      expect(order[1].id).to.equal(ID);
      expect(order[1].name).to.equal(NAME);
    });

    it("Reduced product InStock value", async () => {
      const product = await contract.products(ID);
      expect(product.stock).to.equal(STOCK - 1);
    });

    it("Emit ProductPurchased event", () => {
      expect(tx).to.emit(contract, "ProductPurchased");
    });
  });

  describe("Update Order Status", () => {
    let tx: ContractTransactionResponse;

    beforeEach("Purchase product", async () => {
      // Create a product before purchase
      tx = await contract.createProduct(
        ID,
        NAME,
        CATEGORY,
        DESCRIPTION,
        IMAGE,
        COST,
        RATING,
        STOCK
      );
      await tx.wait();

      tx = await contract
        .connect(buyer as unknown as ContractRunner)
        .purchaseProduct(ID, { value: COST });
      await tx.wait();

      tx = await contract.changeOrderStatus(buyer.address, 1, 3);
      await tx.wait();
    });

    it("Should update Order status", async () => {
      let order = await contract.orders(buyer.address, 1);
      expect(order.status).to.be.equal(3);
    });

    it("Emit OrderStatusChanged event", () => {
      expect(tx).to.emit(contract, "OrderStatusChanged");
    });
  });

  describe("Withdraw Funds", () => {
    let balanceBefore: bigint;

    beforeEach(async () => {
      // Create a product
      let transaction = await contract
        .connect(deployer as unknown as ContractRunner)
        .createProduct(
          ID,
          NAME,
          CATEGORY,
          DESCRIPTION,
          IMAGE,
          COST,
          RATING,
          STOCK
        );
      await transaction.wait();

      // Purchase product
      transaction = await contract
        .connect(buyer as unknown as ContractRunner)
        .purchaseProduct(ID, { value: COST });
      await transaction.wait();

      // Get Deployer balance before
      balanceBefore = await ethers.provider.getBalance(deployer.address);

      // Withdraw
      transaction = await contract
        .connect(deployer as unknown as ContractRunner)
        .withdraw();
      await transaction.wait();
    });

    it("Updates the owner balance", async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it("Updates the contract balance", async () => {
      const contractAddress = await contract.getAddress();
      const result = await ethers.provider.getBalance(contractAddress);
      expect(result).to.equal(0);
    });
  });
});
