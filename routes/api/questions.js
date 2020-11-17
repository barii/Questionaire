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
  questions().find({}).toArray()
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json(err))
});

// @route   GET api/questions/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  questions().findOne({ _id: req.params.id })
    .then(question => {
      if (!question) {
        return res.status(404).json({ notfound: 'No question found with that ID' })
      } else {
        return res.json(question)
      }
    })
    .catch(err => {
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
    validateQuestionInput(req.body)
      .then(question => questions().insertOne(question))
      .then(result => res.json(result.ops[0]))
      .catch(err => res.status(400).json(
        (err.isJoi) ?
          {
            "message": "validation error",
            "details": err.details
          } :
          {
            "message": err.message
          }
      ))
  }
);

// @route   PUT api/questions
// @desc    Update post
// @access  Private
router.put(
  '/:id',
  //  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    validateQuestionInput(req.body)
      .then(question => questions().replaceOne({ _id: req.body._id }, question))
      .then(result => res.json(result.ops[0]))
      .catch(err => res.status(400).json(
        (err.isJoi) ?
          {
            "message": "validation error",
            "details": err.details
          } :
          {
            "message": err.message
          }
      ))
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  //passport.authenticate('jwt', { session: false }),
  (req, res) => {
    questions().deleteOne({ _id: req.params.id })
      .then(result => res.json(result))
      .catch(err =>
        res.status(400).json(err)
        // } else if (obj.result.n==0) {
        //   return res.status(404).json({ notfound: 'No question found with that ID' })
        // }
      )
  }
);

module.exports = router;
