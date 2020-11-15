const express = require('express');
const router = express.Router();
const { questions } = require('../../mongoDb');
//const passport = require('passport');

// Validation
const validateQuestionInput = require('../../validation/question');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Questions Works' }));

// @route   GET api/questions/
// @desc    Get post by id
// @access  Public
router.get('/', (req, res) => {
  questions().find({}).toArray((err, questions) => {
    if(err) {
      return res.status(400).json(err);
    } else {
      return res.json(questions);
    }
  });
});

// @route   GET api/questions/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  questions().findOne({_id: req.params.id}).then(question => {
    if (!question) {
      return res.status(404).json({ notfound: 'No question found with that ID' })
    } else {
      return res.json(question)
    }
  }).catch(err => {
    return res.status(400).json(err)
  });
});

// @route   POST api/questions
// @desc    Create post
// @access  Private
router.post(
  '/',
//  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    validateQuestionInput(req.body).then((question) => {
      questions().insertOne(question, (err, result) => {
        if (err) { 
          console.log(err.message)
          return res.status(400).send(err.message);
        }
        res.json(result.ops[0]) 
      })
    })  
    .catch((err) => {
      console.log
      res.status(400).json(err)
    });
  }
);

// @route   POST api/questions
// @desc    Create post
// @access  Private
router.put(
  '/:id',
//  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    validateQuestionInput(req.body)
      .then( question => questions().replaceOne({_id: req.body._id}, question))
      .catch(err => res.status(400).json(err))
      .then (result => res.json(result.ops[0]))
      .catch(err => res.status(500).send(err))
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  //passport.authenticate('jwt', { session: false }),
  (req, res) => {
    questions().deleteMany({id: req.body.post._id}, (err, obj) => {
      if (err) {
        return res.status(400).json(err)
      } else if (obj.result.n==0) {
        return res.status(404).json({ notfound: 'No question found with that ID' })
      }

      res.end();
    });
  }
);

 module.exports = router;


// // DON'T
// function getUserRouteHandler (req, res) {
//   const { userId } = req.params
//   // inline SQL query
//   knex('user')
//     .where({ id: userId })
//     .first()
//     .then((user) => res.json(user))
// }

// // DO
// // User model (eg. models/user.js)
// const tableName = 'user'
// const User = {
//   getOne (userId) {
//     return knex(tableName)
//       .where({ id: userId })
//       .first()
//   }
// }

// // route handler (eg. server/routes/user/get.js)
// function getUserRouteHandler (req, res) {
//   const { userId } = req.params
//   User.getOne(userId)
//     .then((user) => res.json(user))
// }