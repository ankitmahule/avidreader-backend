import express from "express";
import dbConnect from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import Users from "../db/userModel.mjs";
import bodyParser from "body-parser";

const router = express.Router();
// const jsonParser = bodyParser.json();
dbConnect();

// This section will help you get a list of all the records.
router.get("/users", async (req, res) => {
  /* let collection = await db.collection("users");
  let results = await collection.find({}).toArray(); */
  res.send(results).status(200);
});

router.post("/register", (req, res) => {
  // let collection = await db.collection("users");
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new Users({
        email: req.body.email,
        password: hashedPassword,
        contactNo: req.body.contactNo,
      });
      user
        .save()
        .then(() => {
          res.status(201).send({
            message: "User created successfully",
            status: 201,
          });
        })
        .catch((e) => {
          if (e.code === 11000) {
            res.status(400).send({
              message: "Email Id must be unique",
              errorCode: 11000,
            });
          }
        });
    })
    .catch((e) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

export default router;
