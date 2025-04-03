const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/user-auth");
const User = require("../models/user");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req?.user?.userId });
    if (!user) {
      throw new Error("User not found");
    }
    res.send({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.put("/profile/bookmark-quote", userAuth, async (req, res) => {
  try {
    const { userId } = req.user;
    const bookmarkDetails = req.body;
    const userDetails = await User.findById({ _id: userId });
    userDetails?.bookmarks.push(bookmarkDetails);
    const response = await User.findByIdAndUpdate(userId, userDetails);
    if (response) {
      res.status(200).json({ message: "Quote Bookmarked" });
    }
  } catch (error) {
    res.status(400).json({ errorCode: 400, message: error.toString() });
  }
});

module.exports = profileRouter;
