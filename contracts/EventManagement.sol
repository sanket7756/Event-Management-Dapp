// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Admin.sol";

contract EventManagment is Admin {
    address private manager;

    mapping(address => mapping(uint256 => uint256))
        public addressAndEventIdToNumberOfTickets;

    mapping(uint256 => mapping(uint256 => address))
        public EventIdAndticketIdToAddress;

    mapping(address => mapping(uint256 => totalPurchasedTickets))
        public EventIdAndAddressToPurchasedTicketIds;

    bool isDateValid = false;

    uint256 private balance;

    address public admin;

    eventData[] public eventDataArray;

    totalPurchasedTickets[] public totalPurchasedTicketsStructArray;

    constructor() payable {
        admin = msg.sender;
    }

    struct eventData {
        uint256 eventId;
        string eventName;
        uint256 saleStartDate;
        uint256 saleEndDate;
        uint256 generateTicketId;
        uint256 maxLimitToBuyTickets;
    }

    mapping(uint256 => eventData) public events;

    struct totalPurchasedTickets {
        uint256 eventId;
        uint256 totalPurchasedTicket;
        address calledUser;
    }

    struct ticketData {
        uint256 ticketPrice;
        uint256 totalTickets;

        //uint256 maxLimitToBuyTickets;

        //uint256 generateId;
    }

    mapping(uint => uint[]) tickets;

    mapping(uint256 => ticketData) public eventIdToTicketInfo;

    //EVENTS: events allows us to print stuff to transaction logs
    //An event is emitted, it stores the arguments passed in transaction logs.
    // Generally, events are used to inform the calling application about the current state of the contract, with the help of the logging facility of EVM.

    event managerCreated(address ContractAdmin, address eventManager); //EVENT CREATED TO CHECK MANAGER IN TRANSACTION HISTORY

    event eventCreated(
        string EventName,
        uint EventId,
        uint SaleStartDate,
        uint SaleEndDate
    );

    event ticketInfo(
        uint256 idOfEvent,
        uint256 TicketPrice,
        uint256 TotalNoOfTickets
    );

    event transferTicket(
        uint256 EventId,
        address OwnerOfTicket,
        uint256 ticketId
    );

    event fundsTransfered(address admin, uint256 balance);

    function setEventManager(address toAddress) public onlyAdmin {
        manager = toAddress;

        emit managerCreated(msg.sender, toAddress);
    }

    modifier onlyAdmin() {
        require(contractOwner == msg.sender, "You Are Not Admin");
        _;
    }

    // struct specificEventManager{
    //     address managerEntry;
    // }

    // mapping(uint => specificEventManager) public eventManager;

    function createEvent(
        string memory _eventName,
        uint256 _id,
        uint256 _saleStartDate,
        uint256 _saleEndDate,
        uint256 _generateTicketId,
        uint256 _maxLimitToBuyTickets
    ) public onlyManager {
        //bool checkEventIdExisted = exists(_id);

        //require(checkEventIdExisted == false, "The EventId Has Been Already Existed Please Create Another Unique Id");

        string memory eName = events[_id].eventName;

        require(
            bytes(eName).length == 0,
            "The EventId Has Been Already Existed Please Create Another Unique Id"
        );

        //eventManager[_id].managerEntry = msg.sender;

        events[_id].eventId = _id;

        events[_id].eventName = _eventName;

        events[_id].saleStartDate = _saleStartDate;

        events[_id].saleEndDate = _saleEndDate;

        events[_id].generateTicketId = _generateTicketId;

        events[_id].maxLimitToBuyTickets = _maxLimitToBuyTickets;

        eventDataArray.push(
            eventData(
                _id,
                _eventName,
                _saleStartDate,
                _saleEndDate,
                _generateTicketId,
                _maxLimitToBuyTickets
            )
        );

        emit eventCreated(_eventName, _id, _saleStartDate, _saleEndDate); //EMITING EVENTNAME, EVENTID
    }

    function EventDataArrayReturn() public view returns (eventData[] memory) {
        return eventDataArray;
    }

    function totalPurchasedTicketsStructArrayReturn()
        public
        view
        returns (totalPurchasedTickets[] memory)
    {
        return totalPurchasedTicketsStructArray;
    }

    modifier onlyManager() {
        require(manager == msg.sender, "You Are Not Manager");
        _;
    }

    // FUNCTION FOR CHECKING EVENTID EXISTED OR NOT ALREADY

    // function exists(uint num) private view returns (bool) {

    // string memory getName = events[num].eventName;

    // if(bytes(getName).length == 0){

    //     return false;

    //     }

    // else

    //   return true;

    // }

    function createTicket(
        uint256 _eventId,
        uint256 _ticketPrice,
        uint256 _totalTickets
    ) public {
        bool checkAvailability = checkEventCreatedOrNot(_eventId);

        require(checkAvailability == true, "Incorrect Event Id");

        //    eventIdToTicketInfo[_eventId].ticketPrice = _ticketPrice * 1 ether;
        eventIdToTicketInfo[_eventId].ticketPrice = _ticketPrice;

        eventIdToTicketInfo[_eventId].totalTickets = _totalTickets;

        emit ticketInfo(_eventId, _ticketPrice, _totalTickets);
    }

    function getEventInfoAccordingToId(uint256 id)
        public
        view
        returns (eventData memory)
    {
        return events[id];
    }

    //CAN BUY MULTIPLE TICKETS AT ONE HIT IMPLEMENTED

    function buyTicket(uint256 _eventId, uint256 quantity) external payable {
        bool checkExistenceOfEvent = checkEventCreatedOrNot(_eventId);

        require(checkExistenceOfEvent == true, "Invalid EventId");

        require(
            block.timestamp >= events[_eventId].saleStartDate &&
                block.timestamp <= events[_eventId].saleEndDate,
            "You Can Buy The Tickets With In Valid Dates Only"
        ); // checking event dates are live or not

        require(
            addressAndEventIdToNumberOfTickets[msg.sender][_eventId] <=
                events[_eventId].maxLimitToBuyTickets,
            "Maximum Limit Exceeded"
        );

        uint256 countNumOfTickets = addressAndEventIdToNumberOfTickets[
            msg.sender
        ][_eventId] + quantity;

        require(
            countNumOfTickets <= events[_eventId].maxLimitToBuyTickets,
            "You Are Exceeding The Tickets Limit"
        );

        require(
            eventIdToTicketInfo[_eventId].totalTickets != 0,
            "Tickets Are Not Available"
        );

        uint256 ticketAmount = msg.value;

        uint256 ticketId;

        uint256 totalAmountShouldBeProvided = quantity *
            eventIdToTicketInfo[_eventId].ticketPrice;

        require(
            quantity <= events[_eventId].maxLimitToBuyTickets,
            "Tickets limits should be less than or equal to the given limit"
        );

        require(
            ticketAmount <= totalAmountShouldBeProvided,
            "Please Check The Amount That You Have Provided Its More Than The Actual Amount"
        );

        // require(ticketAmount == totalAmountShouldBeProvided, "Please Provide Valid Amount To Purchase The Tickets");

        balance += ticketAmount;

        for (uint i = 1; i <= quantity; i++) {
            ticketId = events[_eventId].generateTicketId;

            EventIdAndticketIdToAddress[_eventId][ticketId] = msg.sender;

            events[_eventId].generateTicketId = ticketId + 1;

            addressAndEventIdToNumberOfTickets[msg.sender][_eventId] += 1;

            eventIdToTicketInfo[_eventId].totalTickets -= 1;

            tickets[_eventId].push(ticketId);

            EventIdAndAddressToPurchasedTicketIds[msg.sender][
                _eventId
            ] = totalPurchasedTickets(_eventId, ticketId, msg.sender);
            totalPurchasedTicketsStructArray.push(
                totalPurchasedTickets(_eventId, ticketId, msg.sender)
            );

            //PUSHING TICKETS ACCORDING TO EVENT ID
            //   payable(msg.sender).transfer(balance);

            emit transferTicket(_eventId, msg.sender, ticketId);
        }
        (bool sent, bytes memory data) = admin.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    //CHECKING PURCHASED TICKETS ACCORDING TO EVENTID

    function purchasedTicketsAccordingEventId(uint _enterId)
        public
        view
        onlyManager
        returns (uint[] memory)
    {
        return tickets[_enterId];
    }

    function checkEventCreatedOrNot(uint256 _checkId)
        private
        view
        returns (bool)
    {
        string memory checkName = events[_checkId].eventName;

        if (bytes(checkName).length != 0) {
            return true;
        } else return false;
    }

    function CheckManager() public view onlyAdmin returns (address) {
        return manager;
    }

    // FUNCTION TO CHECK BALANCE ONLY BY ADMIN

    function checkBalance() public view onlyAdmin returns (uint) {
        return balance;
        // / 10 ** 18
    }

    function withdrawFunds(uint256 _evid) external onlyAdmin {
        require(
            block.timestamp == events[_evid].saleEndDate,
            "The Sale End Date Has Not Reached Please Try After It Ends"
        );

        payable(contractOwner).transfer(balance);

        emit fundsTransfered(contractOwner, balance);

        balance = 0;
    }
}
