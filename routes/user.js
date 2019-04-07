const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userModel = require('../models/user');

router.post("/signup", (req, res, next) => {
   bcrypt.hash(req.body.password.trim(), 10)
      .then(hash => {
         bcrypt.hash(req.body.username + Date.now(), 10)
            .then(token => {
               const user = new userModel({
                  email: req.body.email.trim(),
                  username: req.body.username.trim(),
                  password: hash,
                  token
               });
               user.save((error, doc) => {
                  if (error) {
                     res.status(500).send({ message: "Unable to insert document", error });
                  }
                  res.status(201).send({ message: "inserted successfully", data: doc['token'] });
               })
            })
      })
});

router.post('/login', (req, res, next) => {
   console.log(`details\nemail: ${JSON.stringify(req.body)}`);
   userModel.find({
      $or: [
         { email: req.body.text.trim() },
         { username: req.body.text.trim() }
      ]
   })
      .then(docs => {
         console.log(docs);
         if (docs.length === 0) {
            res.status(200).send({ message: "user not found" });
            return null;
         }
         bcrypt.compare(req.body.password, docs[0]['password'])
            .then(result => {
               if (result === true) {
                  res.status(200).send({ message: 'success', data: docs[0]['token'] });
               } else {
                  res.status(200).send({ message: "invalid password", data: null })
               }
            })
      })
      .catch(error => {
         console.log('error\n', error)
      })
});

module.exports = router;