const { ObjectID } = require('mongodb');
const uuidv4 = require('uuid/v4');
// const jwt = require('jsonwebtoken');

// const {Todo} = require('./../../models/todo');
// const {User} = require('./../../models/user');

// const userOneId = new ObjectID();
// const userTwoId = new ObjectID();
// const users = [{
//   _id: userOneId,
//   email: 'andrew@example.com',
//   password: 'userOnePass',
//   tokens: [{
//     access: 'auth',
//     token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
//   }]
// }, {
//   _id: userTwoId,
//   email: 'jen@example.com',
//   password: 'userTwoPass',
//   tokens: [{
//     access: 'auth',
//     token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
//   }]
// }];

const questions = [
  {
    id: uuidv4(),
    type: "OpenQuestion",
    text: "haha",
    description: "desc"
  },
  {
    id: uuidv4(),
    type: "MultichoiceQuestion",
    text: "hihi",
    description: "desc",
    choices: [
      {'id': '1', 'value':'optnion1'},
      {'id': '2', 'value':'optnion2'}
    ]
  }
]

const populateQuestions = (done, db) => {
  const questionsCollection = db.collection('questions');

  questionsCollection.insertMany(questions, function(err, res) {
    if (err) throw err;
    console.log("seed: Number of documents inserted: " + res.insertedCount);
    done()
  });

  // Todo.remove({}).then(() => {
  //   return Todo.insertMany(questions);
  // }).then(() => done());
};

// const populateUsers = (done) => {
//   User.remove({}).then(() => {
//     var userOne = new User(users[0]).save();
//     var userTwo = new User(users[1]).save();

//     return Promise.all([userOne, userTwo])
//   }).then(() => done());
// };

module.exports = {populateQuestions};