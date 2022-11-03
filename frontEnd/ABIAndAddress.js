export const contractAddress = "0xE2e9E616c99f758f2996af7bD186f07E7C42F774";

export const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_eventId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "buyTicket",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_eventName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_saleStartDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_saleEndDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_generateTicketId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxLimitToBuyTickets",
        type: "uint256",
      },
    ],
    name: "createEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_eventId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ticketPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalTickets",
        type: "uint256",
      },
    ],
    name: "createTicket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "EventName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "EventId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "SaleStartDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "SaleEndDate",
        type: "uint256",
      },
    ],
    name: "eventCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "fundsTransfered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "ContractAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "eventManager",
        type: "address",
      },
    ],
    name: "managerCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
    ],
    name: "setEventManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "idOfEvent",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "TicketPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "TotalNoOfTickets",
        type: "uint256",
      },
    ],
    name: "ticketInfo",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "EventId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "OwnerOfTicket",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketId",
        type: "uint256",
      },
    ],
    name: "transferTicket",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_evid",
        type: "uint256",
      },
    ],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "addressAndEventIdToNumberOfTickets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "checkBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CheckManager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "eventDataArray",
    outputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "eventName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "saleStartDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "saleEndDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "generateTicketId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxLimitToBuyTickets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EventDataArrayReturn",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "eventId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "eventName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "saleStartDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "saleEndDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "generateTicketId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxLimitToBuyTickets",
            type: "uint256",
          },
        ],
        internalType: "struct EventManagment.eventData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "EventIdAndAddressToPurchasedTicketIds",
    outputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPurchasedTicket",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "calledUser",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "EventIdAndticketIdToAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "eventIdToTicketInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "ticketPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalTickets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "events",
    outputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "eventName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "saleStartDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "saleEndDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "generateTicketId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxLimitToBuyTickets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getEventInfoAccordingToId",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "eventId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "eventName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "saleStartDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "saleEndDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "generateTicketId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxLimitToBuyTickets",
            type: "uint256",
          },
        ],
        internalType: "struct EventManagment.eventData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_enterId",
        type: "uint256",
      },
    ],
    name: "purchasedTicketsAccordingEventId",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "totalPurchasedTicketsStructArray",
    outputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPurchasedTicket",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "calledUser",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPurchasedTicketsStructArrayReturn",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "eventId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalPurchasedTicket",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "calledUser",
            type: "address",
          },
        ],
        internalType: "struct EventManagment.totalPurchasedTickets[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// exports.contractAddress = contractAddress;
// exports.abi = abi;
