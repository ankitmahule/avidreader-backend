const express = require("express");
const quotesRouter = express.Router();
const userAuth = require("../middlewares/user-auth");
const fs = require("fs");
const Quotes = require("../models/quotes");
const { formidable } = require("formidable");

quotesRouter.post("/save-quote", userAuth, async (req, res) => {
  try {
    const form = formidable();
    const { firstName, lastName, userId } = req.user;
    const [content, file] = await form.parse(req);
    if (Object.keys(file).length !== 0) {
      const fileContent = fs.readFileSync(file.file[0].filepath);
      const fileName = file.file[0].originalFilename;
      const quote = new Quotes();
      quote.uploadQuote(fileName, fileContent).then(
        async (response) => {
          const contentImage = response.Location;
          const saveQuote = new Quotes({
            content: content.content[0] || "",
            contentImage: contentImage,
            userId,
            firstName,
            lastName,
          });
          const quoteSaveResponse = await saveQuote.save();
          if (!quoteSaveResponse) {
            throw new Error("Could not post successfully");
          }
          res.status(200).json({ message: "Posted Successfully", status: 200 });
        },
        (error) => {
          throw new Error("Could not post successfully" + error);
        }
      );
      return;
    }
    const saveQuote = new Quotes({
      content: content.content[0],
      contentImage: "",
      userId,
      firstName,
      lastName,
    });
    const quoteSaveResponse = await saveQuote.save();
    if (!quoteSaveResponse) {
      throw new Error("Could not post successfully");
    }
    res.status(200).json({ message: "Posted Successfully", status: 200 });
  } catch (error) {
    res.status(400).json({ errorCode: 400, message: error.toString() });
  }
});

/* quotesRouter.post("/upload-quote", userAuth, async (req, res) => {
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
}); */

quotesRouter.get("/quotes", userAuth, async (req, res) => {
  try {
    const quotes = await Quotes.find({}).sort({ createdAt: "desc" });
    res.status(200).json({ quotes });
  } catch (error) {
    res.status(400).json({ errorCode: 400, message: error.toString() });
  }
});

quotesRouter.put("/bookmark-quote", userAuth, async (req, res) => {
  try {
    const { userId } = req.user;
    const { quoteId } = req.body;
    const quoteDetails = await Quotes.findById({ _id: quoteId });
    if (!quoteDetails?.bookmarkedBy.includes(userId)) {
      const response = await Quotes.findByIdAndUpdate(
        quoteId,
        {
          $push: { bookmarkedBy: userId },
        },
        { new: true }
      );
      if (response) {
        res.status(200).json({
          response,
          message: "Quote Bookmarked",
        });
      }
    } else {
      const response = await Quotes.findByIdAndUpdate(
        quoteId,
        {
          $pull: { bookmarkedBy: userId },
        },
        { new: true }
      );
      if (response) {
        res.status(200).json({
          response,
          message: "Bookmarked Removed",
        });
      }
    }
  } catch (error) {
    res.status(400).json({ errorCode: 400, message: error.toString() });
  }
});

module.exports = quotesRouter;
