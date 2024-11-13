import mongoose from "mongoose";
const connectionString = process.env.DB_URL || "";

/* const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("avidreader");

export default db; */

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

export default dbConnect;
