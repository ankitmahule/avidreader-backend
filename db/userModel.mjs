import mongoose from "mongoose";

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

export default mongoose.model.Users || mongoose.model("Users", UserSchema);
