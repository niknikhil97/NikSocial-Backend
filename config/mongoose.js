const mongooseData = require("../environment").mongoose;
const mongoose = require("mongoose");

mongoose
  .connect(mongooseData.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((response) => {
    console.log("Successfullly Connected to mongo DB server ");
  })
  .catch((error) => {
    console.log("**ERROR while connecting to mongo DB server ::", error);
  });

const db = mongoose.connection;

module.exports = db;
