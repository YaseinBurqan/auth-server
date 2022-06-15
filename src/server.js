"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require("express");
const app = express();
app.use(express.json());

const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");

const signInRoutes = require("./routes/signIn");
const signUpRoutes = require("./routes/signUp");

const secretRouter = require("./routes/secretRouter");
const allUsersRouter = require("./routes/allUsersRouter");


const logger = require("./middleware/logger");

app.get("/", (req, res) => {
  res.status(200).send("server is working");
});

app.use(signInRoutes);
app.use(signUpRoutes);

app.use(secretRouter);
app.use(allUsersRouter);

app.use("*", notFoundHandler);
app.use(errorHandler);

function start(PORT) {
  app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
