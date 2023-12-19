"use strict";
const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;

const app = express();

const {
  addTournament,
  getTournaments,
} = require("./handlers/TournamentHandlers");

const { createNewUser } = require("./handlers/UserHandlers");

// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("tiny"));
app.use(express.json());

// Any requests for static files will go into the public folder
app.use(express.static("public"));

// These are my endpoints!
app.post("/add-tournament", addTournament);
app.get("/get-tournaments/:email", getTournaments);
app.post("/addUser", createNewUser);

// This is a catch all endpoint.
app.get("*", (request, response) => {
  return response.status(404).json({
    status: 404,
    message: "Nothing to see here.",
  });
});

// Node spins up our server and sets it to listen on port 8000.
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
