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

const createNewUser = async (req, res) => {
  const userEmail = req.body.userEmail;

  try {
    await client.connect();

    const newUser = {
      userEmail: userEmail,
      tournaments: [],
    };

    const existingUser = await brainstormDB.findOne({
      userEmail: userEmail,
    });
    if (existingUser) {
      return res.status(202).json({
        status: 202,
        message: "User already exists",
      });
    } else {
      const newUserResult = await brainstormDB.insertOne(newUser);
      if (!newUserResult) {
        return res.status(500).json({
          status: 500,
          message: "Database error",
        });
      }
      return res.status(201).json({
        status: 201,
        message: "User successfully created",
      });
    }
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    client.close();
  }
};
module.exports = { createNewUser };
