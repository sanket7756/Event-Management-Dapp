import { abi, contractAddress } from "./frontEnd/ABIAndAddress.js";
import { ethers } from "./frontEnd/ethers-5.6.esm.min.js";
import eventmanagementController from "./frontEnd/controllers/EventManagementController.js";

const connectButton = document.getElementById("login");
const setManagerValue = document.getElementById("setManagerMain");
const setManagerButtonMain = document.getElementById("setManagerButtonMain");

setManagerButtonMain.onclick = setManagerFunc;

connectButton.onclick = connect;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    console.log(account);
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function setManagerFunc() {
  const managerAddress = setManagerValue.value;
  console.log(`this is called with ${managerAddress} this address`);
  if (typeof window.ethereum !== "undefined") {
    // console.log("is this working");
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(contractAddress, abi, signer);
    // console.log(contract);
    // await contract.setEventManager(managerAddress);
    let contractInstance =
      await eventmanagementController.contractInteraction();
    const checkingManager = await contractInstance.setEventManager(
      managerAddress
    );
    console.log(checkingManager);
    const checkingManagerPart = await contractInstance.CheckManager();
    console.log(checkingManagerPart);
  }
}
