const mongoose = require("mongoose");
const connectionString = process.env.DB_URL || "";

async function dbConnect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("Unable to connect to database");
      console.error(error);
    });
}

module.exports = dbConnect;
