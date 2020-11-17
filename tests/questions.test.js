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

/***************
* GET
****************/

describe('GET /questions', () => {
  test('should respond with json', async () => {
    await request(app)
      .get('/api/questions/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200) // note that we're passing the done as parameter to the expect
      .expect(res => expect(res.body.length).toBe(2))
  });
});

describe('GET /questions/:id', () => {
  test('when provided with existing id, it should respond with json', async () => {
    await request(app)
      .get('/api/questions/' + openQuestion._id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200) // note that we're passing the done as parameter to the expect
      .expect(res => expect(res.body).toStrictEqual(openQuestion))

  });

  it('when provided with non-existing id, it should respond with 404', async () => {
    await request(app)
      .get('/api/questions/' + 123)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404); // note that we're passing the done as parameter to the expect
  });
});

/***************
* POST
****************/

describe('POST /questions', () => {
  test('when provided with correct open question, it should create a new open question', async () => {
    const question = {
      _id: "00000000-0000-0000-0000-000000000003",
      type: "open",
      text: "new open question",
      description: "new open question descroption"
    };

    await request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(200)
      .expect(res => expect(res.error).toBeFalsy())
      .expect(res => expect(res.body).toStrictEqual(question))

    await db.collection('questions').findOne({ _id: question._id }).then(question =>
      expect(question).toStrictEqual(question)
    )
  })

  test('when try to create the same question 2 times, it should fail', async () => {
    const question = {
      _id: "00000000-0000-0000-0000-000000000003",
      type: "open",
      text: "new open question",
      description: "new open question descroption"
    };

    await request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(200)

    await request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(400)
      .then(res => expect(res.body.message).toContain("duplicate key"))
  })

  test('when try to create invalid question, it should fail', async () => {
    const question = {
      _id: "00000000-0000-0000-0000-000000000003",
      type: "open",
    };

    await request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(400)
      .expect(res => expect(res.body.message).toEqual("validation error"))
      .expect(res => expect(res.body.details[0].message).toEqual('"text" is required'))
  })

  test('when try to create invalid question type, it should fail', async () => {
    const question = {
      _id: "00000000-0000-0000-0000-000000000003",
      type: "invalid",
      text: "invalid question",
      description: "invalid question descroption"
    };

    await request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(400)
      .expect(res => expect(res.body.message).toEqual("validation error"))
      .expect(res => expect(res.body.details[0].message).toEqual('Invalid question type'))
  })

  test('should create a new multichoice question', async () => {
    const question = {
      _id: "00000000-0000-0000-0000-000000000003",
      type: "multichoice",
      text: "testMultichoiceQuestion",
      description: "testMultichoiceQuestionDescription",
      choices: [
        { '_id': uuid(), 'value': 'optnion1' },
        { '_id': uuid(), 'value': 'optnion2' }
      ]
    }

    await request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(200)
      .expect(res => expect(res.body.text).toBe(question.text))

    await db.collection('questions').findOne({ _id: question._id }).then(res =>
      expect(res.text).toBe(question.text)
    )
  })

  test('when provided with incorrect option, it should not create a new multichoice question', async () => {
    id = uuid();
    const question = {
      _id: id,
      type: "multichoice",
      text: "testMultichoiceQuestion",
      description: "testMultichoiceQuestionDescription",
      choices: [
        { '_id': uuid(), 'value': 'optnion1' },
        { '_id': uuid() },
        { '_id': uuid(), 'value': 'optnion2' }
      ]
    }

    const res = await request(app)
      .post('/api/questions/')
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(400)
      .expect(res => expect(res.body.message).toEqual("validation error"))
      .expect(res => expect(res.body.details[0].message).toEqual('"choices[1].value" is required'))
  });
});

/***************
* PUT
****************/

describe('PUT /questions/:id', () => {
  test('when provided with correct open question, it should update existing open question', async () => {
    const question = {
      _id: "00000000-0000-0000-0000-000000000001",
      type: "open",
      text: "new open question",
      description: "new open question descroption"
    };

    await request(app)
      .put('/api/questions/' + question._id)
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(200)
      .expect(res => expect(res.error).toBeFalsy())
      .expect(res => expect(res.body).toStrictEqual(question))

    await db.collection('questions').findOne({ _id: question._id }).then(question =>
      expect(question).toStrictEqual(question)
    )
  })

  // test('when try to update non-existing question, it should fail', async () => {
  //   const question = {
  //     _id: "00000000-0000-0000-0000-000000000005",
  //     type: "open",
  //     text: "new open question",
  //     description: "new open question descroption"
  //   };

  //   await request(app)
  //     .put('/api/questions/' + question._id)
  //     //.set('x-auth', users[0].tokens[0].token)
  //     .set('Accept', 'application/json')
  //     .send(question)
  //     .expect(400)
  //     .then(res => expect(res.body.message).toContain("duplicate key"))
  // })

  test('when try to update question with invalid data, it should fail', async () => {
    const question = {
      _id: "00000000-0000-0000-0000-000000000001",
      type: "open",
    };

    await request(app)
      .put('/api/questions/' + question._id)
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(400)
      .expect(res => expect(res.body.message).toEqual("validation error"))
      .expect(res => expect(res.body.details[0].message).toEqual('"text" is required'))
  })

  test('when try to update question with invalid question type, it should fail', async () => {
    const question = {
      _id: "00000000-0000-0000-0000-000000000003",
      type: "invalid",
      text: "invalid question",
      description: "invalid question descroption"
    };

    await request(app)
      .put('/api/questions/' + question._id)
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(400)
      .expect(res => expect(res.body.message).toEqual("validation error"))
      .expect(res => expect(res.body.details[0].message).toEqual('Invalid question type'))
  })

  test('when provided with correct multichoice question, it should update existing multichoice question', async () => {
    const question = {
      _id: "00000000-0000-0000-0000-000000000002",
      type: "multichoice",
      text: "testMultichoiceQuestion",
      description: "testMultichoiceQuestionDescription",
      choices: [
        { '_id': uuid(), 'value': 'optnion1' },
        { '_id': uuid(), 'value': 'optnion2' }
      ]
    }

    await request(app)
      .put('/api/questions/' + question._id)
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(200)
      .expect(res => expect(res.body.text).toBe(question.text))

    await db.collection('questions').findOne({ _id: question._id }).then(res =>
      expect(res.text).toBe(question.text)
    )
  })

  test('when provided with incorrect option, it should not update existing multichoice question', async () => {
    const question = {
      _id: "00000000-0000-0000-0000-000000000002",
      type: "multichoice",
      text: "testMultichoiceQuestion",
      description: "testMultichoiceQuestionDescription",
      choices: [
        { '_id': uuid(), 'value': 'optnion1' },
        { '_id': uuid() },
        { '_id': uuid(), 'value': 'optnion2' }
      ]
    }

    await request(app)
      .put('/api/questions/' + question._id)
      //.set('x-auth', users[0].tokens[0].token)
      .set('Accept', 'application/json')
      .send(question)
      .expect(400)
      .expect(res => expect(res.body.message).toEqual("validation error"))
      .expect(res => expect(res.body.details[0].message).toEqual('"choices[1].value" is required'))
  });

});


/***************
* DELETE
****************/

describe('DELETE /questions/:id', () => {
  test('when provided with existing id, it should respond with json', async () => {
    await request(app)
      .delete('/api/questions/00000000-0000-0000-0000-000000000001')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200) // note that we're passing the done as parameter to the expect
      .expect(res => expect(res.body.deletedCount).toBe(1))

    db.collection('questions').find({}).toArray().then(res => {
      expect(res.length).toBe(1)
    })
  });

  it('when provided with non-existing id, it should respond with 404', async () => {
    await request(app)
      .delete('/api/questions/00000000-0000-0000-0000-000000000003')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => expect(res.body.deletedCount).toBe(0))
    //.expect(404); // note that we're passing the done as parameter to the expect
  });
});