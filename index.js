const app = require("./config/app");
const router = require("./routes");
const port = 8000;

app.listen(port, function (error) {
  if (error) {
    console.log("Error while listening on port :: ", port);
    return;
  }

  console.log("Successfully connected on port :: ", port);
});
