// const hre = require("hardhat");
// const { network } = require("hardhat");
// const { ethers, providers } = require("hardhat");
import { ethers } from "../ethers-5.6.esm.min.js";
import { contractAddress, abi } from "../ABIAndAddress.js";
// const { contractAddress, abi } = require("../ABIAndAddress");

const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/ZG2gd-31RvBOf2EeSnp-yNceYxDCpFRR"
);
const wallet = new ethers.Wallet(
  "c233c769330788729bd46d785f93a05aeb45db845946d3ce1abf7886c5776f14",
  provider
);
const EventManagerFactory = new ethers.Contract(contractAddress, abi, wallet);
// console.log(EventManagerFactory);

// module.exports = EventManagerFactory;

export default EventManagerFactory;
