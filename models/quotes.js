const mongoose = require("mongoose");
const AWS = require("aws-sdk");
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
    bookmarkedBy: {
      type: [String],
    },
    content: {
      type: String,
    },
    contentImage: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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

QuotesSchema.methods.uploadQuote = async (fileName, fileContent) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const params = {
      Bucket: "avidreader",
      Key: fileName,
      Body: fileContent,
    };

    const response = await s3.upload(params).promise();
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = mongoose.model("Quotes", QuotesSchema);
