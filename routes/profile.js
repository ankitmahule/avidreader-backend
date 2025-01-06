const express = require("express");
const profileRouter = express.Router();

const userAuth = require("../middlewares/user-auth");
const user = require("../models/user");

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
