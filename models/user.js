const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Invalid Password" + value);
        }
      },
    },
    contactNo: {
      type: Number,
      required: [true, "Please provide a contact number"],
      unique: [true, "Contact number exists"],
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Admin@1234$", {
    expiresIn: "7d",
  });

  return token;
};

UserSchema.methods.validatePassword = async function (passwordInput) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInput, passwordHash);
  return isPasswordValid;
};

module.exports = mongoose.model("User", UserSchema);
