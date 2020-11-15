const expect = require('expect');
const uuid = require('uuid/v4');
const mongo = require('../mongoDb');
const { app } = require('../app');
const request = require("supertest");
const { assert } = require('joi');


// afterEach(async () => {
//   await Promise.all(["questions"].map(c => db.collection(c).remove({})))
// });

// afterAll(async () => {
//   await mongo.close()
// });

describe('test mongodb connection', () => {
  it('should connect to DB corerctly', async () => {

    try {
      const mongoURI = require('../config/keys').mongoURI;
      const mongoDB = require('../config/keys').mongoDB;
      const db = await mongo.connect(mongoURI, mongoDB);

      expect(db).not.toBeNull();
      await mongo.close()
    } catch (e) {
      fail(e)
    }
  });

  it('should NOT connect to incorrect DB corerctly', async () => {

    try {
      const mongoURI = "fake";
      const mongoDB = require('../config/keys').mongoDB;
      await mongo.connect(mongoURI, mongoDB);

      fail(e)
    } catch (e) {

    }
  });
});
