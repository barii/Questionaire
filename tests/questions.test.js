const expect = require('expect');
const uuid = require('uuid/v4');
const mongo = require('../mongoDb');
const { app } = require('../app');
const request = require("supertest");
 //const { Todo } = require('./../models/todo');
// const { User } = require('./../models/user');
//const {populateQuestions} = require('./seed/seed');

let db;

//afterEach(() => dbman.cleanup());

beforeAll(async (done) => {
  const mongoURI = require('../config/keys').mongoURI;
  const mongoDB = require('../config/keys').mongoDB;
  mongo.connect(mongoURI, mongoDB, () => {
    //db = await client.db(global.__MONGO_DB_NAME__);
    db = mongo.get()
    //await populateQuestions(done, db);
    done();
  })
});

 afterAll(async () => {
  await mongo.close()
 });

describe('GET /questions', () => {
  it('respond with json', async done => {
    // the request-object is the supertest top level api
    request(app)
      .get('/api/questions/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res).not.toBeNull();
      })
      .expect(200, done); // note that we're passing the done as parameter to the expect
  });
});


describe('POST /questions', () => {
  // var tests = [
  //   {args: [1, 2],       expected: 3},
  //   {args: [1, 2, 3],    expected: 6},
  //   {args: [1, 2, 3, 4], expected: 10}
  // ];

  // tests.forEach(function(test) {
  //   it('correctly adds ' + test.args.length + ' args', function() {
  //     var res = add.apply(null, test.args);
  //     assert.equal(res, test.expected);
  //   });
  // });


  it('should create a new open question', (done) => {
    uuid = uuid();
    const openQuestion = {
      _id: uuid,
      type: "open",
      text: "haha",
      description: "desc"
    };

    request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(openQuestion)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(openQuestion.text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        db.collection('questions').findOne({_id: uuid}, (err, res) => {
          if (err) return done(err);

          expect(res.text).toBe(openQuestion.text);
          done();
        });
      });
  });

  it('should create a new multichoice question', (done) => {
    uuid = uuid();
    const question = {
      _id: uuid,
      type: "multichoice",
      text: "testMultichoiceQuestion",
      description: "testMultichoiceQuestionDescription",
      choices: [
        {'_id': uuid(), 'value':'optnion1'},
        {'_id': uuid(), 'value':'optnion2'}
      ]
    }

    request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(question.text);
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        db.collection('questions').findOne({_id: uuid}, (err, res) => {
          if (err) return done(err);

          expect(res.text).toBe(question.text);
          done();
        });
      });
  });

});
