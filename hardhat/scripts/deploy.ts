import { ethers } from "hardhat";
import { products } from "../constants/items.json";
import { tokens } from "../utils";

const main = async () => {
  // SetUp Account
  const [deployer] = await ethers.getSigners();

  // Deploy contract
  const cryptocart = await ethers.getContractFactory("CryptoCart");
  const contract = await cryptocart.deploy({ gasLimit: 1500000 });
  const contractAddress = await contract.getAddress();
  console.log(`Deployed Contract at => ${contractAddress}`);

  // Add some product items
  for (let i = 0; i < products.length; i++) {
    const tx = await contract.createProduct(
      products[i].id,
      products[i].name,
      products[i].category,
      products[i].description,
      products[i].image,
      tokens(+products[i].price),
      products[i].rating,
      products[i].stock
    );
    await tx.wait();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`Listed item ${products[i].id}: ${products[i].name}`);
  }
};

main()
  .then(() => console.log("Deploy successful !!"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
