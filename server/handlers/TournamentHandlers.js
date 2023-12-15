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
  console.log(req.body);
  try {
    await client.connect();
    const newTournament = req.body;
    const newTournamentResult = await tournamentCollection.insertOne(
      newTournament
    );
    if (!newTournamentResult.insertedId) {
      return res.status(502).json({
        status: 502,
        message: "Database Error!!",
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Tournament successfully added to database",
      });
    }
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    client.close();
  }
};

const getTournaments = async (req, res) => {
  try {
    await client.connect();

    const tournamentData = await tournamentCollection.find().toArray();
    if (!tournamentData) {
      return res.status(404).json({
        status: 404,
        message: "No tournaments found.",
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Success",
        data: tournamentData,
      });
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

module.exports = { addTournament, getTournaments };
