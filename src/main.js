const { ethers } = require("ethers");
const eventManagementController = require("./controllers/EventManagementController.js");

const connectButton = document.getElementById("connectButton");
const setManagerValue = document.getElementById("setManager");
const setManagerButton = document.getElementById("setManagerButton");

setManagerButton.onclick = setManagerFunc;

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
  // console.log(setManagerValue.value);
  eventManagementController.setEventManager(setManagerValue.value);
  let managerCheck = eventManagementController.checkManager();
  console.log("this is being called");
  console.log(managerCheck);
}
