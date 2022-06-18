"use strict";
const base64 = require("base-64");

// const bcrypt = require("bcrypt");
const { users } = require("../models/users-models");
// const errorHandler = require("../error-handlers/404");

function basic(req, res, next) {
  if (req.headers.authorization) {
    let basicHeaderParts = req.headers.authorization.split(" ");
    let encodedValue = basicHeaderParts.pop();
    let decodedValue = base64.decode(encodedValue);
    let [username, password] = decodedValue.split(":");
    Users.authenticateBasic(username, password)
      .then((validUser) => {
        req.user = validUser;
        next();
      })
      .catch((err) => {
        console.log(err);
        next("Invalid SignIn");
      });
  }
}

module.exports = basicAuth;
