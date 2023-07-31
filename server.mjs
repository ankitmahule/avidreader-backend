import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import bodyParser from "body-parser";

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
