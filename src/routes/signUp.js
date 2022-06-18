"use strict";

// const base64 = require("base-64");
// const bcrypt = require("bcrypt");
const express = require("express");
const {
  users
} = require("../models/index-models");
const signUp = express.Router();

signUp.post("/signup", handleSignup);

async function handleSignup(req, res, next) {
  try {
    users.beforeCreate(req.body.password).then(async (hashedPass) => {
        let userRecord = await users.create({
          username: req.body.username,
          password: hashedPass
        });
        const output = {
          user: userRecord,
          token: userRecord.token
        };
        res.status(201).json(userRecord);
      })
      .catch((e) => {})
  } catch (e) {
    console.error(e);
    next(e);
  }
}
// yasein
module.exports = signUp;
