"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const database = client.db("brainstorm");
const tournamentCollection = database.collection("tournament-results");
// const ObjectId = require("mongodb").ObjectId;

const addTournament = async (req, res) => {
  const { round, matchup, wins, losses, draws, notes, date } = req.body;
  try {
    await client.connect();
    console.log(req.body);
    const newTournament = { round, matchup, wins, losses, draws, notes, date };
    const newTournamentResult = await tournamentCollection.insertOne(
      newTournament
    );
    if (!newTournamentResult.insertedId) {
      return res.status(502).json({
        status: 502,
        message: "Brian says database Error!!",
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "you did a good job brian!",
      });
    }
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    client.close();
  }
};

module.exports = { addTournament };
