// configure the app or express app
// setup middlewares
// setup explicit settings
const express = require("express");
const router = require("../routes");
const mongoose = require("./mongoose");
const passport = require("passport");

// initialize app
const app = express();

// setup middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// initialize passport
app.use(passport.initialize());

// setup routes
app.use("/", router);

module.exports = app;
