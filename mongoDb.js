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

get = () => {
  if(!_db) {
      throw new Error('Call connect first!');
  }

  return _db;
}

close = () => {
  _client.close();
}

module.exports = {
  connect,
  get,
  close
};
