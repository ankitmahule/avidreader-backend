const express = require("express");
const cors = require("cors");
require("./loadEnvironment.js");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./db/conn.js");

const PORT = process.env.port || 5050;

const app = express();

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const quotesRouter = require("./routes/quotes-route.js");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", quotesRouter);

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
