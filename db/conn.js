const mongoose = require("mongoose");
const connectionString = process.env.DB_URL || "";

dbConnect = async () => await mongoose.connect(process.env.DB_URL);

module.exports = dbConnect;
