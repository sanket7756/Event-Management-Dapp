// const EventManagerFactory = require("../service/ethersWrapper");
// const { ethers, providers } = require("hardhat");
import { ethers } from "../ethers-5.6.esm.min.js";
import EventManagerFactory from "../service/ethersWrapper.js";
const POLYGON_RPC_URL = "https://rpc-mumbai.maticvigil.com";
const PRIVATE_KEY =
  "5d2be30e435d7e18378212b4d84a004fddf958e6853ef485ce42529c0f577252";
// const { contractAddress, abi } = require("../ABIAndAddress");
import { contractAddress, abi } from "../ABIAndAddress.js";

class eventManagementController {
  async assignManagerRole(public_key) {
    let assigningEventManagerRole = await EventManagerFactory.setEventManager(
      public_key,
      { gasPrice: "50000000000" }
    );
    await assigningEventManagerRole.wait();
    const eventManager = await EventManagerFactory.CheckManager();
    // console.log(eventManager);
    return eventManager;
  }

  // async createEventCheck(
  //   eventName,
  //   id,
  //   startDate,
  //   endDate,
  //   generateTicketId,
  //   maximumLimitToBuyTicket
  // ) {
  //   const provider = new ethers.providers.JsonRpcProvider(POLYGON_RPC_URL);
  //   const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  //   const contractWithSigner = new ethers.Contract(
  //     contractAddress,
  //     abi,
  //     wallet
  //   );

  //   let creatingEvent = await contractWithSigner.createEvent(
  //     eventName,
  //     id,
  //     startDate,
  //     endDate,
  //     generateTicketId,
  //     maximumLimitToBuyTicket,
  //     { gasPrice: "50000000000" }
  //   );
  //   await creatingEvent.wait();
  //   // console.log(creatingEvent);
  //   const eventCheck = await contractWithSigner.getEventInfoAccordingToId(id);
  //   return eventCheck;
  // }
  async contractInteraction() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }
}

// async function get;ManagerResult() {
const eventmanagementController = new eventManagementController();
// eventmanagementController.createEventCheck(
//   "martial arts",
//   800,
//   1659312000,
//   1661904000,
//   10,
//   3
// );
// eventmanagementController.assignManagerRole(
//   "0x7c17a2b3eAa4D624dA8d1B6996e3692159FD9c08"
// );
//console.log(result);
//}

//getManagerResult();

// module.exports = eventmanagementController;
export default eventmanagementController;
