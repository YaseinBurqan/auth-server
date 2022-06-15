"use strict";

const base64 = require("base-64");
const bcrypt = require("bcrypt");

const express = require("express");

const { users } = require("../models/index");

const signIn = express.Router();

signIn.post("/signin", async (req, res) => {
  if (req.headers.authorization) {
    let basicHeaderParts = req.headers.authorization.split(" ");
    let encoded = basicHeaderParts[1];

    let decoded = base64.decode(encoded);
    let username = decoded.split(":")[0];
    let password = decoded.split(":")[1];
    
    try {
      const user = await users.findOne({ where: { username: username } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        res.status(200).json({
          user,
        });
      } else {
        res.status(500).send("wrong username or password");
      }
    } catch {
      res.status(500).send("app error");
    }
  }
});

module.exports = signIn;
