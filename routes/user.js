const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const courseModel = require('../models/course');
const lessonModel = require('../models/lesson');
const assignmentModel = require('../models/assignment');
const config = require('../config/keys');

router.post("/signup", (req, res, next) => {
   bcrypt.hash(req.body.password.trim(), 10)
      .then(hash => {
         const payload = { email: req.body.email.trim() };
         const token = jwt.sign(payload, config.secretOrKey);
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
            console.log('user stored', doc);
            res.status(201).send({ message: "inserted successfully", data: doc['token'] });
         })
      })
      .catch(error => res.status(400).json({ error }))
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
            return res.status(200).send({ message: "user not found" });
         }
         bcrypt.compare(req.body.password, docs[0]['password'])
            .then(result => {
               if (result === true) {
                  // res.status(200).send({ message: 'success', data: docs[0]['token'] });
                  //user matched
                  const payload = { email: docs[0]['email'] };
                  console.log('payload', payload, config.secretOrKey);
                  // sign token
                  const token = jwt.sign(payload, config.secretOrKey);
                  docs[0]['token'] = token;
                  // console.log(jwt.verify(token+"1233", config.secretOrKey));
                  return res.status(200).json({ message: 'success', data: token });
               } else {
                  return res.status(200).send({ message: "invalid password", data: null })
               }
            })
      })
      .catch(error => {
         console.log('error\n', error)
      })
});

router.post('/courses/', (req, res) => {
   const token = req.body.token;
   try {
      const payload = jwt.verify(token, config.secretOrKey)
      console.log(payload);
      userModel.findOne({ email: payload.email })
         .then(user => {
            courseModel.find({ _id: { $in: user.courses } })
               .populate({ path: 'lessons', populate: { path: 'assignments' } })
               .then(courses => {
                  res.status(200).send({ message: "courses found", courses });
               })
               .catch(error => {
                  res.status(500).json({ message: "unable to find courses", error });
               });
         })
         .catch(error => {
            res.status(400).json({ error });
         })
   } catch (error) {
      res.status(400).json({ "message": "Unauthorized access", error });
   }
})

module.exports = router;