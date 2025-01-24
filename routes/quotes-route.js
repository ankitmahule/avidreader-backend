const express = require("express");
const quotesRouter = express.Router();
const userAuth = require("../middlewares/user-auth");
const fs = require("fs");
const Quotes = require("../models/quotes");
const quotes = require("../models/quotes");
const User = require("../models/user");
const { formidable } = require("formidable");

quotesRouter.post("/save-quote", userAuth, async (req, res) => {
  try {
    const { content, userId } = req.body;
    if (!content) {
      throw new Error("No Content Present");
    }
    const quote = new Quotes({
      content,
      userId,
      firstName,
      lastName,
    });
    const saveQuoteResponse = await quote.save();
    if (!saveQuoteResponse) {
      throw new Error("Could not post successfully");
    }
    res.status(200).json({ message: "Posted Successfully", status: 200 });
  } catch (error) {
    res.status(400).json({ errorCode: 400, message: error.toString() });
  }
});

quotesRouter.post("/upload-quote", userAuth, async (req, res) => {
  try {
    const form = formidable();
    const { firstName, lastName, userId } = req.user;
    const [_, files] = await form.parse(req);
    const quote = new Quotes();
    const fileContent = fs.readFileSync(files.file[0].filepath);
    const fileName = files.file[0].originalFilename;
    if (!fileContent) {
      throw new Error("No Content Present");
    }

    quote.uploadQuote(fileName, fileContent).then(
      async (response) => {
        content = response.Location;
        const saveQuote = new Quotes({
          content,
          userId,
          firstName,
          lastName,
        });
        quoteSaveResponse = await saveQuote.save();
        if (!quoteSaveResponse) {
          throw new Error("Could not post successfully");
        }
        res.status(200).json({ message: "Posted Successfully", status: 200 });
      },
      (error) => {
        throw new Error("Could not post successfully" + error);
      }
    );
  } catch (error) {
    res.status(400).json({ errorCode: 400, message: error.toString() });
  }
});

quotesRouter.get("/quotes", userAuth, async (req, res) => {
  try {
    const quotes = await Quotes.find({});
    // const userId = req?.user?.userId;
    // const userResponse = await User.findOne({ _id: userId }).exec();
    res.status(200).json({ quotes });
  } catch (error) {
    res.status(400).json({ errorCode: 400, message: error.toString() });
  }
});

module.exports = quotesRouter;
