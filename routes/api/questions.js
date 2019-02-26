const express = require('express');
const router = express.Router();
const db = require('../../mongoDb').get;
//const passport = require('passport');

// Post model
//const Post = require('../../models/Post');
// Profile model
//const Profile = require('../../models/Profile');

// Validation
const validateQuestionInput = require('../../validation/question');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Questions Works' }));

router.get('/user', function(req, res){
  res.send(200, { name: 'marcus' });
});

// // @route   GET api/posts
// // @desc    Get posts
// // @access  Public
// router.get('/', (req, res) => {
//   Post.find()
//     .sort({ date: -1 })
//     .then(posts => res.json(posts))
//     .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
// });

// @route   GET api/questions/
// @desc    Get post by id
// @access  Public
router.get('/', (req, res) => {
  db().collection('questions').find({}).toArray((err, questions) => {
    if(err) {
      return res.status(400).json(err);
    } else {
      res.json(questions);
    }
  });
});

// @route   GET api/questions/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  db().collection('questions').findOne({id: req.params.id}, (err, question) => {

    if(err) {
      return res.status(400).json(err);
    } else if (!question) {
      return res.status(404).json({ notfound: 'No question found with that ID' })
    } else {
      res.json(question);
    }
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
      .then((question) => {
        db().collection('questions').insertOne(question, (err, result) => {
          if (err) { 
            console.log(err)
            return res.status(400).send(err);
          }
          res.json(result.ops[0])
        })
      })  
      .catch((err) => {//if (!isValid) {
        console.log(err);
        return res.status(400).json(err);
      })
  }
);

// @route   POST api/questions
// @desc    Create post
// @access  Private
router.patch(
  '/:id',
//  passport.authenticate('jwt', { session: false }),
  (req, res) => {
       
    validateQuestionInput(req.body)
      .then((question) => {
        console.log(req.params.id);
        db().collection('questions').replaceOne({id: req.params.id}, question, (err, result) => {
          if (err) { 
            console.log(err)
            return res.status(500).send(err);
          }
          res.json(result.ops[0])
        })
      })
      .catch((err) => {//if (!isValid) {
        console.log(err.annotate())
        return res.status(400).json(err);
      })
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  //passport.authenticate('jwt', { session: false }),
  (req, res) => {
    db().collection('questions').deleteMany({id: req.params.id}, (err, obj) => {
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