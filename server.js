const express = require("express");
const cors = require("cors");
require("./loadEnvironment.js");
const records = require("./routes/record.js");
const bodyParser = require("body-parser");

const PORT = process.env.port || 5050;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", records);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
