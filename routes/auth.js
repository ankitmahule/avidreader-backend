const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password, contactNo } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: passwordHash,
      contactNo,
    });

    if (
      (await User.findOne({ email })) ||
      (await User.findOne({ contactNo }))
    ) {
      throw new Error("User Already exists");
    }

    const savedUser = await user.save();
    if (!savedUser) {
      throw new Error("User not added successfully");
    }
    res.json({ message: "User Added Successfully", data: savedUser });
  } catch (error) {
    res.status(400).send("Invalid Error" + error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User doesn't exists");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid Username or Password");
    }
    const token = await user.getJwt();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        /*       sameSite: "None",
        secure: false,
        path: "/",
        httpOnly: true,
        domain: "localhost", */
      })
      .send({
        status: 200,
        message: "Login Successful",
        data: { email: user.email, id: user._id },
      });
  } catch (error) {
    res.status(400).send("Invalid Error" + error);
  }
});

authRouter.post("/logout", async (res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful");
});

module.exports = authRouter;
