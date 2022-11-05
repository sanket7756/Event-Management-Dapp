import { abi, contractAddress } from "./frontEnd/ABIAndAddress.js";
import { BigNumber, ethers } from "./frontEnd/ethers-5.6.esm.min.js";
import eventmanagementController from "./frontEnd/controllers/EventManagementController.js";
// import Web3 from "web3";

const adminBalanceElement = document.getElementById("adminBalance");

let isEventIdSameAsBlockchain = false;

let viewEvents = true;
let web3;

let isEventCreated = false;

let isTicketCreated = false;

// Main Top Part
let mainEventPageElement = document.getElementById("mainEventPage");

// Admin Elements
let adminLoginPartAnchorElement = document.getElementById("adminloginPart");

let adminSetManagerPartAnchorElement = document.getElementById(
  "adminSetManagerPart"
);
let adminBalancePartAnchorElement = document.getElementById("adminBalancePart");

// Admin HTML Elements
let adminLoginContainer = document.getElementById("adminLoginContainer");
let adminLoginHTMLButtonElement = document.getElementById("login");
let adminSetManagerHTMLContainerElement = document.getElementById("main-card");
let adminSetManagerHTMLButtonElement = document.getElementById(
  "setManagerButtonMain"
);

let adminBalanceContainerElement = document.getElementById(
  "adminBalanceContainer"
);
let adminBalanceParaElement = document.getElementById("adminBalanceText");
let adminBalanceSpanElement = document.getElementById("adminBalance");

let adminWithdrawFundsContainerElement = document.getElementById(
  "adminWithdrawFundsContainer"
);

let adminWithdrawPartElement = document.getElementById("adminWithdrawPart");
let withdrawButtonElement = document.getElementById("withdraw");

// Manager Elements
let managerContainerElement = document.getElementById("loginButtonContainer");
let managerLoginHTMLAnchorElement = document.getElementById("managerLogin");
let managerLoginButtonElement = document.getElementById("loginManagerButton");
let createEventHTMLAnchorElement = document.getElementById("createEvent");
let createEventHTMLCardElement = document.getElementById("createEventCard");
let createEventHTMLSubmitButtonElement = document.getElementById(
  "createEventButtonMain"
);

const createEventNameField = document.getElementById("enameMain");
const createEventIdField = document.getElementById("eidMain");
const createEventSaleStartDateField =
  document.getElementById("saleStartDateMain");
const createEventSaleEndDateField = document.getElementById("saleEndDateMain");
const createEventGenerateTicketIdField = document.getElementById(
  "generateTicketIdMain"
);
const createEventMaxLimitToBuyTicketsField = document.getElementById(
  "maxLimitToBuyTicketsMain"
);
let createEventSubmitButtonElement = document.getElementById(
  "createEventButtonMain"
);

let createTicketHTMLCardElement = document.getElementById("createTicketCard");
let createTicketHTMLAnchorElement = document.getElementById("createTicket");
let managerCreateEventEventIdElement = document.getElementById("eventidMain");
let managerCreateEventTicketPriceElement =
  document.getElementById("ticketPriceMain");
let managerCreateEventTotalTicketsElement =
  document.getElementById("totalTicketsMain");
let managerCreateTicketSubmitButtonElement = document.getElementById(
  "createTicketButtonMain"
);

// Purchase Ticket Modal Elements
let pruchaseModalContainerElement = document.getElementById("cardContainer");
let purchaseModalElement = document.getElementById("purchaseModal");
let purchaseTicketButtonElement = document.getElementById("purchaseTicket");

// View Events Part
let viewEventsButtonHTMLAnchorElement =
  document.getElementById("eventButtonPart");

// All Events Display Part
let allEventsDisplayCardElement = document.getElementById("allEventsDisplay");

// User Purchased Tickets Part
let userPurchasedTicketsElement = document.getElementById(
  "userPurchasedTickets"
);
let userPurchasedTicketsContainerElement = document.getElementById(
  "userPurchasedTicketsContainer"
);

const decimals = 0;

adminLoginPartAnchorElement.onclick = connect;

adminSetManagerPartAnchorElement.onclick = loginConnect;

adminBalancePartAnchorElement.onclick = getAdminBalance;

managerLoginHTMLAnchorElement.onclick = managerLoginFunc;

createEventHTMLAnchorElement.onclick = createEventFormDisplayFunc;

createEventHTMLSubmitButtonElement.onclick = createEventFunc;

createTicketHTMLAnchorElement.onclick = createTicketDisplayFunc;

viewEventsButtonHTMLAnchorElement.onclick = displayEvents;

managerCreateTicketSubmitButtonElement.onclick = createTicketFunc;

purchaseTicketButtonElement.onclick = userPurchaseTicket;

userPurchasedTicketsElement.onclick = userPurchasedTicketsFunc;

adminWithdrawPartElement.onclick = adminWithdrawFunc;

document
  .getElementById("purchaseTicket")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

document
  .getElementById("eventButtonPart")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

document
  .getElementById("createEventButtonMain")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

document
  .getElementById("createTicketButtonMain")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

async function connect() {
  loginDisplay();
  console.log("Inside create event file");

  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }

    // const accounts = await ethereum.request({ method: "eth_accounts" });
    // const account = accounts[0];
    // console.log(account);

    adminLoginHTMLButtonElement.innerHTML = "Connected";
  } else {
    adminLoginHTMLButtonElement.innerHTML = "Please install MetaMask";
  }
}

function loginDisplay() {
  console.log("You have clicked");
  adminLoginHTMLButtonElement.style.display = "block";
  adminSetManagerHTMLContainerElement.style.display = "none";
  managerLoginButtonElement.style.display = "none";
  createEventHTMLCardElement.style.display = "none";
  createTicketHTMLCardElement.style.display = "none";
  allEventsDisplayCardElement.style.display = "none";
  adminBalanceParaElement.style.display = "none";
  userPurchasedTicketsContainerElement.style.display = "none";
  withdrawButtonElement.style.display = "none";
}

async function loginConnect() {
  console.log("login connect is called");

  loginSetManager();
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const accounts = await provider.listAccounts();

    await provider.getBalance(accounts[0]).then((balance) => {
      const balanceInEth = ethers.utils.formatEther(balance);
      // globalBalanceElement = balanceInEth;
      // const roundOffBalance = Math.round(balanceInEth * 1000);
      // console.log(`balance: ${balanceInEth} MATIC`);
    });
    console.log("before connected is called");
  }

  allEventsDisplayCardElement.style.display = "none";
}

function loginSetManager() {
  console.log("login display part is called");
  adminLoginHTMLButtonElement.style.display = "none";
  adminSetManagerHTMLContainerElement.style.display = "block";
  managerLoginButtonElement.style.display = "none";
  createEventHTMLCardElement.style.display = "none";
  createTicketHTMLCardElement.style.display = "none";
  allEventsDisplayCardElement.style.display = "none";
  adminBalanceParaElement.style.display = "none";
  userPurchasedTicketsContainerElement.style.display = "none";
  withdrawButtonElement.style.display = "none";
}

async function getAdminBalance() {
  adminLoginHTMLButtonElement.style.display = "none";
  adminSetManagerHTMLContainerElement.style.display = "none";
  managerLoginButtonElement.style.display = "none";
  createEventHTMLCardElement.style.display = "none";
  createTicketHTMLCardElement.style.display = "none";
  allEventsDisplayCardElement.style.display = "none";
  adminBalanceParaElement.style.display = "block";
  userPurchasedTicketsContainerElement.style.display = "none";
  withdrawButtonElement.style.display = "none";

  // web3 = new Web3(ethereum);
  // let contractInstance = new web3.eth.Contract(abi, contractAddress);
  // console.log(contractInstance);
  // let account = await web3.eth.getAccounts();
  // let adminBalance = await contractInstance.methods.checkBalance().call();
  // console.log(adminBalance);

  let contractInstance = await eventmanagementController.contractInteraction();
  let adminBalance = await contractInstance.checkBalance();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(provider);
  const accounts = await provider.listAccounts();
  const account = accounts[0];
  console.log(account);

  adminBalanceSpanElement.innerHTML = adminBalance / 10 ** 18 + ` ETH`;
  allEventsDisplayCardElement.style.display = "none";
}

async function adminWithdrawFunc() {
  withdrawButtonElement.style.display = "block";
  adminLoginHTMLButtonElement.style.display = "none";
  adminSetManagerHTMLContainerElement.style.display = "none";
  managerLoginButtonElement.style.display = "none";
  createEventHTMLCardElement.style.display = "none";
  createTicketHTMLCardElement.style.display = "none";
  allEventsDisplayCardElement.style.display = "none";
  adminBalanceParaElement.style.display = "none";
  userPurchasedTicketsContainerElement.style.display = "none";
}

async function managerLoginFunc() {
  adminLoginHTMLButtonElement.style.display = "none";
  adminSetManagerHTMLContainerElement.style.display = "none";
  managerLoginButtonElement.style.display = "block";
  createEventHTMLCardElement.style.display = "none";
  createTicketHTMLCardElement.style.display = "none";
  allEventsDisplayCardElement.style.display = "none";
  adminBalanceParaElement.style.display = "none";
  userPurchasedTicketsContainerElement.style.display = "none";
  withdrawButtonElement.style.display = "none";

  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const accounts = await provider.listAccounts();
      // console.log(accounts);
    } catch (error) {
      console.log(error);
    }

    managerLoginButtonElement.innerHTML = "Connected";
  } else {
    managerLoginButtonElement.innerHTML = "Please install MetaMask";
  }
  allEventsDisplayCardElement.style.display = "none";
}

async function createEventFormDisplayFunc() {
  adminLoginHTMLButtonElement.style.display = "none";
  adminSetManagerHTMLContainerElement.style.display = "none";
  managerLoginButtonElement.style.display = "none";
  createEventHTMLCardElement.style.display = "block";
  createTicketHTMLCardElement.style.display = "none";
  allEventsDisplayCardElement.style.display = "none";
  adminBalanceParaElement.style.display = "none";
  userPurchasedTicketsContainerElement.style.display = "none";
  withdrawButtonElement.style.display = "none";
}

async function createEventFunc() {
  const eventNameValue = createEventNameField.value;
  const eventIdValue = createEventIdField.value;
  const saleStartDateValue = createEventSaleStartDateField.value;
  const saleEndDateValue = createEventSaleEndDateField.value;
  const generateTicketIdValue = createEventGenerateTicketIdField.value;
  const maxLimitToBuyTicketsValue = createEventMaxLimitToBuyTicketsField.value;

  // console.log(createEventFromBlockchain);

  if (typeof window.ethereum !== "undefined") {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    let contractInstance =
      await eventmanagementController.contractInteraction();

    let createdEvent = await contractInstance.createEvent(
      eventNameValue,
      eventIdValue,
      saleStartDateValue,
      saleEndDateValue,
      generateTicketIdValue,
      maxLimitToBuyTicketsValue
    );

    let transactionStatus = createdEvent.v;

    if (transactionStatus == 1) {
      isEventCreated = true;
    }

    let saleStartDateValueInMilliseconds = saleStartDateValue * 1000;
    let saleEndDateValueInMillisecond = saleEndDateValue * 1000;

    let normalSaleStartDate = new Date(saleStartDateValueInMilliseconds);
    let normalSaleEndDateValue = new Date(saleEndDateValueInMillisecond);

    let finalVisibleSaleStartDate =
      normalSaleStartDate.toLocaleDateString("en-US");
    let finalVisibleSaleEndDate =
      normalSaleEndDateValue.toLocaleDateString("en-US");

    let eventDataArray = await contractInstance.EventDataArrayReturn();

    let eventDataArrayLength = eventDataArray.length + 1;

    for (let i = 0; i <= eventDataArrayLength; i++) {
      const singleEventData = eventDataArray[i];
    }

    let EventInfo = await contractInstance.getEventInfoAccordingToId(
      eventIdValue
    );
  }
  allEventsDisplayCardElement.style.display = "none";
}

async function createTicketDisplayFunc() {
  adminLoginHTMLButtonElement.style.display = "none";
  adminSetManagerHTMLContainerElement.style.display = "none";
  managerLoginButtonElement.style.display = "none";
  createEventHTMLCardElement.style.display = "none";
  createTicketHTMLCardElement.style.display = "block";
  allEventsDisplayCardElement.style.display = "none";
  adminBalanceParaElement.style.display = "none";
  userPurchasedTicketsContainerElement.style.display = "none";
  withdrawButtonElement.style.display = "none";
}

async function createTicketFunc() {
  const createTicketEventValue = managerCreateEventEventIdElement.value;
  const ticketPriceValue = managerCreateEventTicketPriceElement.value;
  const totalTicketsValue = managerCreateEventTotalTicketsElement.value;

  if (typeof window.ethereum !== "undefined" && isEventCreated == true) {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    const account = accounts[0];

    let contractInstance =
      await eventmanagementController.contractInteraction();

    console.log(`${ticketPriceValue}`);
    let managerProvidedTicketPrice = ethers.utils.parseUnits(
      ticketPriceValue,
      decimals
    );

    console.log(`${managerProvidedTicketPrice}`);

    console.log(`${ticketPriceValue}` === `${managerProvidedTicketPrice}`);

    let createdTicketInfo = await contractInstance.createTicket(
      createTicketEventValue,
      ticketPriceValue,
      // ethers.utils.parseUnits(ticketPriceValue, decimals),
      totalTicketsValue
    );

    let createdTicketTransactionStatus = createdTicketInfo.v;

    if (createdTicketTransactionStatus == 1) {
      isTicketCreated = true;
    }

    let checkingTicketInfo = await contractInstance.eventIdToTicketInfo(
      createTicketEventValue
    );
    const ticketPrice = ticketPriceValue.toString();

    const totalTickets = ethers.BigNumber.from(totalTicketsValue).toNumber();
  }
  allEventsDisplayCardElement.style.display = "none";
}

async function displayEvents() {
  // let allEventsDisplayBool = true;
  adminLoginHTMLButtonElement.style.display = "none";
  adminSetManagerHTMLContainerElement.style.display = "none";
  managerLoginButtonElement.style.display = "none";
  createEventHTMLCardElement.style.display = "none";
  createTicketHTMLCardElement.style.display = "none";
  allEventsDisplayCardElement.style.display = "block";
  adminBalanceParaElement.style.display = "none";
  userPurchasedTicketsContainerElement.style.display = "none";
  withdrawButtonElement.style.display = "none";

  let contractInstance = await eventmanagementController.contractInteraction();
  let eventDataArray = await contractInstance.EventDataArrayReturn();
  // console.log(eventDataArray);
  let eventDataArrayLength = eventDataArray.length;
  // console.log(eventDataArrayLength);

  for (let i = 0; i <= eventDataArrayLength; i++) {
    const singleEventData = eventDataArray[i];
    // console.log(singleEventData);
  }

  eventDataArray.forEach(async (singleEvent, idx) => {
    let stringId = idx.toString();
    // console.log(stringId);

    let eventNameFromBlockchain = singleEvent.eventName;
    let eventIdFromBlockchain = singleEvent.eventId;
    let maximumLimitToBuyTicketsFromBlockchain =
      singleEvent.maxLimitToBuyTickets;
    let ticketInfoFromBlockchain = await contractInstance.eventIdToTicketInfo(
      eventIdFromBlockchain
    );

    // window.location.reload();

    let ticketPrice = ticketInfoFromBlockchain.ticketPrice;
    console.log(`${ticketPrice}`);
    let ticketPriceInEth = ethers.utils.formatEther(ticketPrice);
    console.log(ticketPriceInEth);
    // console.log(ticketPriceInEth / 10 ** 18);

    let ticketPriceFromBlockchain = `${ticketPriceInEth}`;
    let totalTicketsFromBlockchain = `${ticketInfoFromBlockchain.totalTickets}`;

    let saleStartDateValue = singleEvent.saleStartDate;
    let saleEndDateValue = singleEvent.saleEndDate;
    let saleStartDateValueInMilliseconds = saleStartDateValue * 1000;
    let saleEndDateValueInMillisecond = saleEndDateValue * 1000;

    let normalSaleStartDate = new Date(saleStartDateValueInMilliseconds);
    let normalSaleEndDateValue = new Date(saleEndDateValueInMillisecond);

    let finalVisibleSaleStartDate =
      normalSaleStartDate.toLocaleDateString("en-US");
    let finalVisibleSaleEndDate =
      normalSaleEndDateValue.toLocaleDateString("en-US");

    const content = `
      <div class="row">
       <div class="column">
         <div class="event-card" id=${stringId}>
           <h3>Event Name: ${eventNameFromBlockchain}</h3>
           <p>Event Id: ${eventIdFromBlockchain}</p>
           <p>Maximum Limit To Buy Tickets: ${maximumLimitToBuyTicketsFromBlockchain}</p>
           <p>Sale Start Date: ${finalVisibleSaleStartDate}</p>
           <p>Sale End Date: ${finalVisibleSaleEndDate}</p>
           <p>Ticket Price: ${ticketPriceFromBlockchain} ETH</p>
           <p>Total Number of Tickets: ${totalTicketsFromBlockchain}</p>
           <button class="button btn btn-primary" data-toggle="modal" data-target="#purchaseModal" onclick="userPurchaseFunc()">Purchase</button>
         </div>
       </div>
      </div>
      `;
    allEventsDisplayCardElement.innerHTML += content;
  });
}

window.userPurchaseFunc = async () => {
  purchaseModalElement.style.display = "block";
  userPurchasedTicketsContainerElement.style.display = "none";
};

async function userPurchaseTicket() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("buy button is being called by the user");
    // viewEventsClickedOnlyOnce = true;
    // console.log(viewEventsClickedOnlyOnce);

    let contractInstance =
      await eventmanagementController.contractInteraction();

    let priceInputElement = document.getElementById("priceInput");
    let eventIdElement = document.getElementById("eventId");
    let quantityElement = document.getElementById("quantity");

    let priceInputElementValue = priceInputElement.value;
    let eventIdElementValue = eventIdElement.value;
    let quantityElementValue = quantityElement.value;

    let ticketInfoAccordingToIdFromBlockchain =
      await contractInstance.eventIdToTicketInfo(eventIdElementValue);

    let eventDataArrayFromBlockchain =
      await contractInstance.EventDataArrayReturn();

    eventDataArrayFromBlockchain.forEach(async (singleEvent) => {
      let singleEventIdFromBlockchain = `${singleEvent.eventId}`;
      let ticketInfoFromBlockchain = await contractInstance.eventIdToTicketInfo(
        singleEventIdFromBlockchain
      );
      let ticketPriceFromBlockChain = `${ticketInfoFromBlockchain.ticketPrice}`;
      // console.log(singleEventId);
      if (singleEventIdFromBlockchain === eventIdElementValue) {
        console.log("inside single Event from blockchain");

        // web3 lib instance
        // get all accounts
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const accounts = await provider.listAccounts();
        // const signer = provider.getSigner();s
        // console.log(signer);
        // let weiValue = ethers.utils.formatEther("100000000000000000");
        // console.log(weiValue);
        // let mainValue = weiValue.toString(10);
        // console.log(weiValue.toString(10));
        let priceInputElementString = ethers.utils.parseEther(
          priceInputElementValue
        );
        console.log(`${priceInputElementString}`);

        let buyTicketFromBlockChain = await contractInstance.buyTicket(
          eventIdElementValue,
          quantityElementValue,
          {
            value: ethers.utils.parseEther(priceInputElementValue),
            gasPrice: "4000000000",
            // { gasPrice: "50000000000" }
          }
        );
      }
    });

    // console.log(priceInputElementValue);
    // console.log(eventIdElementValue);
    // console.log(quantityElementValue);

    priceInputElement.value = "";
    eventIdElement.value = "";
    quantityElement.value = "";
  } else {
    console.log("Metamask wallet is not installed please install wallet");
  }
}

async function userPurchasedTicketsFunc() {
  adminLoginHTMLButtonElement.style.display = "none";
  adminSetManagerHTMLContainerElement.style.display = "none";
  managerLoginButtonElement.style.display = "none";
  createEventHTMLCardElement.style.display = "none";
  createTicketHTMLCardElement.style.display = "none";
  allEventsDisplayCardElement.style.display = "none";
  adminBalanceParaElement.style.display = "none";
  userPurchasedTicketsContainerElement.style.display = "block";
  withdrawButtonElement.style.display = "none";

  let adminLoginPartAnchorEle = document.getElementById("adminSetManagerPart");

  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    let contractInstance =
      await eventmanagementController.contractInteraction();
    let totalPurchasedTicketsStructArrayFromBlockChain =
      await contractInstance.totalPurchasedTicketsStructArrayReturn();
    // console.log(totalPurchasedTicketsStructArrayFromBlockChain);
    // console.log(`${totalPurchasedTicketsStructArrayFromBlockChain}`);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    let account = accounts[0];
    // console.log(account);

    let totalPurchasedTicketsStructLength =
      totalPurchasedTicketsStructArrayFromBlockChain.length;
    let eventDataArrayFromBlockchain =
      await contractInstance.EventDataArrayReturn();
    console.log(eventDataArrayFromBlockchain);

    totalPurchasedTicketsStructArrayFromBlockChain.forEach(
      async (singlePurchasedTicket, idx) => {
        let stringId = idx.toString();
        if (singlePurchasedTicket.calledUser == account) {
          // console.log(singlePurchasedTicket.calledUser);
          // console.log(idx);
          let content = `
        <div class="row">
          <div class="column">
            <div class="event-card" id=${stringId}>
              <p>Event Id: ${singlePurchasedTicket.eventId}</p>
              <p>User Address: ${account}</p>
              <p>Ticket Id: ${singlePurchasedTicket.totalPurchasedTicket}</p>
            </div>
          </div>
        </div>
        `;
          userPurchasedTicketsContainerElement.innerHTML += content;
        }
      }
    );
  }
}
