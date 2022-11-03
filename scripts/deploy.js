const hre = require("hardhat");
const { network } = require("hardhat");
const { ethers, providers } = require("hardhat");

async function main() {
  const EventContractPart = await ethers.getContractFactory("EventManagment");
  console.log("Deploying Contract");
  const EventManagementDeployment = await EventContractPart.deploy();
  await EventManagementDeployment.deployed();
  console.log(`Deployed Contract to: ${EventManagementDeployment.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
