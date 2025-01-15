const mongoose = require("mongoose");
const QuotesSchema = new mongoose.Schema(
  {
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: String,
      trim: true,
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quotes", QuotesSchema);
