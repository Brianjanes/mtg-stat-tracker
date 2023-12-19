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
const brainstormDB = database.collection("users");
// const ObjectId = require("mongodb").ObjectId;

const addTournament = async (req, res) => {
  // console.log(req.body.tournaments);

  try {
    await client.connect();
    const newTournament = req.body.tournaments;
    console.log(newTournament);
    const currentUser = await brainstormDB.findOne({
      userEmail: req.body.userEmail,
    });
    if (!currentUser) {
      return response.status(404).json({
        status: 404,
        message: "User not found, please log in.",
      });
    } else {
      const updatedUser = await brainstormDB.updateOne(
        { userEmail: req.body.userEmail },
        { $push: { tournaments: newTournament } }
      );
      if (!updatedUser) {
        return res.status(500).json({
          status: 500,
          message: "Error uploading new tournament",
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: "success",
        });
      }
    }
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    client.close();
  }
};

const getTournaments = async (req, res) => {
  const userEmail = req.params.email;
  try {
    await client.connect();
    const findUser = await brainstormDB.findOne({ userEmail: userEmail });
    if (!findUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found, can't get tournament information",
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Successfully fetched tournament information",
        data: findUser.tournaments,
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    client.close();
  }
  // try {
  //   await client.connect();
  //   const tournamentData = await tournamentCollection.find().toArray();
  //   if (!tournamentData) {
  //     return res.status(404).json({
  //       status: 404,
  //       message: "No tournaments found.",
  //     });
  //   } else {
  //     return res.status(200).json({
  //       status: 200,
  //       message: "Success",
  //       data: tournamentData,
  //     });
  //   }
  // } catch (error) {
  //   console.error("Error: ", error);
  // }
};

module.exports = { addTournament, getTournaments };
