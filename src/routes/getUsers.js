"use strict";
const express = require("express");
const allUsersRouter = express.Router();
const { Users } = require("../models/users-models");
const bearer = require("../middleware/bearer");
const logger = require("../middleware/logger");

allUsersRouter.get("/users", bearer, async (req, res, next) => {
  console.log("yasein", Users);
  try {
    const userRecords = await Users.findAll({});
    console.log("yasein", Users);
    const userName = userRecords.map((element) => element.username);
    // const userName = await users.findOne({ where: { username: username } });
    res.status(200).json(userName, {
      message: "You are authorized to view the user orders",
      user: req.user,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

allUsersRouter.use(logger);
module.exports = allUsersRouter;
