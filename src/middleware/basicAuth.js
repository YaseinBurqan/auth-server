"use strict";
const base64 = require("base-64");

// const bcrypt = require("bcrypt");
const { Users } = require("../models/index");
// const errorHandler = require("../error-handlers/404");

async function basicAuth(req, res, next) {
  if (req.headers.authorization) {
    let basicHeaderParts = req.headers.authorization.split(" "); // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(":");

    Users.authenticateBasic(username, password)
      .then((validUser) => {
        req.user = validUser;

        next();
      })
      .catch((e) => {
        console.log(e);
        res.status(403);
        next("Invalid SignIn");
      });
  }
}

module.exports = basicAuth;
