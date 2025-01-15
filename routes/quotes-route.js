const express = require("express");
const quotesRouter = express.Router();
const userAuth = require("../middlewares/user-auth");

const Quotes = require("../models/quotes");
const quotes = require("../models/quotes");

quotesRouter.post("/save-quote", userAuth, async (req, res) => {
  try {
    const { content, userId } = req.body;
    if (!content) {
      throw new Error("No Content Present");
    }
    const quote = new Quotes({
      content,
      userId,
    });
    const saveQuoteResponse = await quote.save();
    if (!saveQuoteResponse) {
      throw new Error("Could not post successfully");
    }
    res.status(200).json({ message: "Successfully posted" });
  } catch (error) {
    res.status(400).json({ errorCode: 400, message: error.toString() });
  }
});

quotesRouter.get("/quotes", userAuth, async (req, res) => {
  try {
    const { userId } = req.body;
    const quotes = await Quotes.find({ userId }).exec();
    res.status(200).json({ quotes });
  } catch (error) {
    res.status(400).json({ errorCode: 400, message: error.toString() });
  }
});

module.exports = quotesRouter;
