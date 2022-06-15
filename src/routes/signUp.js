"use strict";

const base64 = require("base-64");
const bcrypt = require("bcrypt");
const express = require("express");
const { users } = require("../models/index");
const signUp = express.Router();

signUp.post("/signup", signUpHandler);

async function signUpHandler(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await users.create(req.body);
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send("Error Creating User");
  }
}

module.exports = signUp;
