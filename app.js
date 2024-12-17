const express = require("express");
const cors = require("cors");
require("./loadEnvironment.js");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./db/conn.js");

const PORT = process.env.port || 5050;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js");

app.use("/api/v1", authRouter);

dbConnect()
  .then(() => {
    console.log("Successfully connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Unable to connect to database");
    console.error(error);
  });
