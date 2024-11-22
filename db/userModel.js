const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    unique: [true, "Email Exisits"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  contactNo: {
    type: Number,
    required: [true, "Please provide a contact number"],
    unique: [true, "Contact number exists"],
  },
});

module.exports = mongoose.model("Users", UserSchema);
