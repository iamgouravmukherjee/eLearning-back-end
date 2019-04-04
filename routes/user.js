const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userModel = require('../models/user');

router.get('/', (req, res, next) => {
   userModel.find({}).then(response => {
      res.status(200).send({ status: true, response });
   })
})

router.post("/signup", (req, res, next) => {
   bcrypt.hash(req.body.password, 10)
      .then(hash => {
         const user = new userModel({
            email: req.body.email,
            password: hash
         });
         user.save((error, doc) => {
            if (error) {
               res.status(500).send({ message: "Unable to insert document", error });
            }
            res.status(201).send({ message: "inserted successfully", data: doc });
         })
      })
});

module.exports = router;