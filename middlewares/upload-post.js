/* const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = async (fileName, fileContent) => {
  try {
    console.log(fileName, fileContent);
    const params = {
      Bucket: "avidreader",
      Key: fileName,
      Body: fileContent,
    };

    await s3.upload(params, (err, data) => {
      if (err) {
        throw new Error("Error uploading file:" + err);
      } else {
        return `File uploaded successfully. ${data.Location}`;
      }
    });
    // await s3.upload(params);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = uploadFile;
 */
