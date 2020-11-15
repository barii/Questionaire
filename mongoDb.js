var MongoClient = require('mongodb').MongoClient;

let _client;
let _db;

connect = (url, dbname, done) => {
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(client => {
    _client = client
    _db = client.db(dbname);
    done();
  })
  .catch(console.error);
};

connect = async (url, dbname) => {
  try {

    _client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    _db = await _client.db(dbname);
    return _db;
  }
  catch (e) {
    throw e;
  };
};

get = () => {
  if(!_db) {
      throw new Error('Call connect first!');
  }

  return _db;
}

questions = () => _db.collection('questions');


close = async () => {
  await _client.close();
}

module.exports = {
  questions,

  connect,
  get,
  close
};
