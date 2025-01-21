const express = require("express");
const quotesRouter = express.Router();
const userAuth = require("../middlewares/user-auth");
const fs = require("fs");
const Quotes = require("../models/quotes");
const quotes = require("../models/quotes");
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
    const [_, files] = await form.parse(req);
    const quote = new Quotes();
    const fileContent = fs.readFileSync(files.file[0].filepath);
    const fileName = files.file[0].originalFilename;
    if (!fileContent) {
      throw new Error("No Content Present");
    }
    /* const response = quote.uploadQuote(fileName, fileContent);
    if (!response) {
      throw new Error("Could not post successfully");
    } else {
      console.log(response);
      res.status(200).json({ message: response.toString(), status: 200 });
    } */

    quote.uploadQuote(fileName, fileContent).then(
      async (response) => {
        const userId = req.user.id;
        content = response.Location;
        console.log(response);
        const saveQuote = new Quotes({
          content,
          userId,
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
    res.status(200).json({ quotes });
  } catch (error) {
    res.status(400).json({ errorCode: 400, message: error.toString() });
  }
});

module.exports = quotesRouter;
