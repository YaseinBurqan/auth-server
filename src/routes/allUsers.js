"use strict";
const express = require("express");
const allUsersRouter = express.Router();
const { Users } = require("../module/Users");
const bearer = require("../middleware/bearer");
const logger = require("../middleware/logger");

allUsersRouter.get("/users", bearer, async (req, res, next) => {
  try {
    const userRecords = await Users.findAll({});
    const userName = userRecords.map((user) => user.username);
    res.status(200).json(userName);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

allUsersRouter.use(logger);
module.exports = allUsersRouter;
