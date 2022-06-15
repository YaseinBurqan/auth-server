"use strict";

const Users = require("../models/users-models");

async function bearer(req, res, next) {
  if (req.headers.authorization) {
    const bearerToken = req.headers.authorization.split(" ")[1];

    Users.authenticateBearer(bearerToken)
      .then((userData) => {
        // console.log(userData);
        req.user = userData;
        next();
      })
      .catch(() => {
        // res.status(403);
        res.send("Invalid SignIn Token");
      });
  }
}

module.exports = bearer;
