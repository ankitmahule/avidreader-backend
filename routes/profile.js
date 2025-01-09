const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/user-auth");
const User = require("../models/user");

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send({ id: user.id, email: user.email });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
