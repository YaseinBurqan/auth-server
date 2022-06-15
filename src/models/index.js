"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const POSTGRES_URI = process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;
const user = require("./users-models");

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
          native: true,
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

module.exports = {
  db: sequelize,
  users: user(sequelize, DataTypes),
};
