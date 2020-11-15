const expect = require('expect');
const uuid = require('uuid/v4');
const mongo = require('../mongoDb');
const { app } = require('../app');
const request = require("supertest");
 //const { Todo } = require('./../models/todo');
// const { User } = require('./../models/user');
//const {populateQuestions} = require('./seed/seed');

let db;


const openQuestion = {
  _id: "00000000-0000-0000-0000-000000000001",
  type: "open",
  text: "Open Question",
  description: "Open Question Description"
};

const multichoiceQuestion = {
  _id: "00000000-0000-0000-0000-000000000002",
  type: "open",
  text: "Open Question",
  description: "Open Question Description"
};

beforeAll(async () => {
  const mongoURI = require('../config/keys').mongoURI;
  const mongoDB = require('../config/keys').mongoDB;
  db = await mongo.connect(mongoURI, mongoDB);
});

beforeEach(async () => {
  await db.collection('questions').insertOne(openQuestion);
  await db.collection("questions").insertOne(multichoiceQuestion);
});

afterEach(async () => {
  await Promise.all(["questions"].map(c => db.collection(c).deleteMany({})))
});

afterAll(async () => {
  await mongo.close()
});

describe('GET /questions', () => {
  test('should respond with json', async () => {
    // the request-object is the supertest top level api
    const res = await request(app)
      .get('/api/questions/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200); // note that we're passing the done as parameter to the expect
      
      expect(res).not.toBeNull();
  });
});

describe('GET /questions/:id', () => {
  test('when privided with existing id, it should respond with json', async () => {
    // the request-object is the supertest top level api
    const res = await request(app)
      .get('/api/questions/' + openQuestion._id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200); // note that we're passing the done as parameter to the expect

      expect(res.body).toStrictEqual(openQuestion);
  });

   it('when privided with non-existing id, it should respond with 404', async () => {
    await request(app)
      .get('/api/questions/' + 123)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404); // note that we're passing the done as parameter to the expect
   });
});


describe('POST /questions', () => {
  test('when procided with correct open question, it should create a new open question', async () => {
    const openQuestion = {
      _id: "00000000-0000-0000-0000-000000000003",
      type: "open",
      text: "new open question",
      description: "new open question descroption"
    };

    await request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(openQuestion)
      .expect(200)
      .expect(res => expect(res.error).toBeFalsy())
      .expect(res => expect(res.body).toStrictEqual(openQuestion))

    const question = await db.collection('questions').findOne({ _id: openQuestion._id });
    expect(question).toStrictEqual(openQuestion);
  })

  test('when try to create the same question 2 times, it should fail', async () => {
    const openQuestion = {
      _id: "00000000-0000-0000-0000-000000000003",
      type: "open",
      text: "new open question",
      description: "new open question descroption"
    };

    await request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(openQuestion)
      .expect(200)

    await request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(openQuestion)
      .expect(400)
      .then(res => expect(res.error.text).toContain("duplicate key"))
  })

  test('when try to create invalid question, it should fail', async () => {
    const openQuestion = {
      _id: "00000000-0000-0000-0000-000000000003",
      type: "open",
    };

    const x = await request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(openQuestion)
      .expect(400)
      .then(res => expect(res.error.text).toEqual("incorrect question type"));


      })


      // test('when try to create invalid question type, it should fail', async () => {
      //   const openQuestion = {
      //     _id: "00000000-0000-0000-0000-000000000003",
      //     type: "invalid",
      //     text: "invalid question",
      //     description: "invalid question descroption"
      //   };
    
      //   const x = await request(app)
      //     .post('/api/questions/')
      //     //.set('x-auth', users[0].tokens[0].token)
      //     .set('Accept', 'application/json')
      //     .send(openQuestion)
      //     .expect(400)
      //     .then(res => expect(res.error.text).toEqual("incorrect question type"));
    
    
      //     })


  // it('should create a new multichoice question', async () => {
  //   id = uuid();
  //   const question = {
  //     _id: id,
  //     type: "multichoice",
  //     text: "testMultichoiceQuestion",
  //     description: "testMultichoiceQuestionDescription",
  //     choices: [
  //       {'_id': uuid(), 'value':'optnion1'},
  //       {'_id': uuid(), 'value':'optnion2'}
  //     ]
  //   }

  //   const res = await request(app)
  //     .post('/api/questions/')
  //     //.set('x-auth', users[0].tokens[0].token)
  //     .set('Accept', 'application/json')
  //     .send(question)
  //     .expect(200)

  //       expect(res.body.text).toBe(question.text);
      

  //       const res2 = await db.collection('questions').findOne({_id: id})
          
  //       expect(res2.text).toBe(question.text);
        
  // });

});
