const express = require("express");
const router = require("./routes");

const port = 8000;
const app = express();

app.use("/", router);

app.listen(port, function (error) {
  if (error) {
    console.log("Error while listening on port :: ", port);
    return;
  }

  console.log("Successfully connected on port :: ", port);
});
