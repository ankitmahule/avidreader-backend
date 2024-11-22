const express = require("express");
const dbConnect = require("../db/conn.js");
const bcrypt = require("bcrypt");
const Users = require("../db/userModel.js");
const jsonwebtoken = require("jsonwebtoken");

const router = express.Router();
dbConnect();

router.post("/login", async (req, res) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Login Failed. Invalid Email/Password.",
              errorCode: 11000,
            });
          }
          const token = jsonwebtoken.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },

            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          res.status(200).send({
            message: "Login successful",
            status: 200,
            authToken: token,
          });
        })
        .catch((error) => {
          if (error) {
            res.status(400).send({
              message: `Login Failed. Invalid Email/Password.`,
              errorCode: error.code,
            });
          }
        });
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({
          message: `User Email/Contact no. not found`,
          errorCode: 11000,
        });
      }
    });
});

router.post("/register", (req, res) => {
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
            message: "Account created successfully",
            status: 201,
          });
        })
        .catch((error) => {
          if (error) {
            res.status(400).send({
              message:
                "Couldn't register user, Email Id/Contact no already exists",
              errorCode: error.code,
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

module.exports = router;
