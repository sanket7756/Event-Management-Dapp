const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const eventManagementController = require("../controllers/EventManagementController");
const { response } = require("express");

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/setManager", async (req, res) => {
  let address = req.body.address;
  let result = await eventManagementController.assignManagerRole(address);
  res.send(`The event Manager assigned is: ${result}`);
});

app.post("/getEventInfo", async (req, res) => {
  let eventName = req.body.eventName;
  let id = req.body.id;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let generateTicketId = req.body.generateTicketId;
  let maximumLimitToBuyTicket = req.body.maximumLimitToBuyTicket;
  let result = await eventManagementController.createEventCheck(
    eventName,
    id,
    startDate,
    endDate,
    generateTicketId,
    maximumLimitToBuyTicket
  );
  res.send(`The event Created is: ${result}`);
});

app.get("/getTodaysDate", async (req, res) => {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let todaysDate = new Date();
  let todaysDay = todaysDate.getDay();
  let dayName = days[todaysDay];
  res.send(`Todays day is ${todaysDate}`);
});

app.get("/getTodaysTime", async (req, res) => {
  let todaysDate = new Date();
  let todayHours = todaysDate.getHours();
  let todaysMinutes = todaysDate.getMinutes();
  let todaysSeconds = todaysDate.getSeconds();
  let todaysTimeAsPerHours = todayHours <= 12 ? "am" : "pm";
  let result = `Todays time: ${todayHours}:${todaysMinutes}:${todaysSeconds}${todaysTimeAsPerHours}`;
  res.send(`Todays time is: ${result}`);
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
