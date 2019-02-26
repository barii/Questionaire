var MongoClient = require('mongodb').MongoClient;


let _db;

connect = (url, dbname, done) => {
  MongoClient.connect(url, {useNewUrlParser: true})
    .catch(error => reject(error))
    .then(client => {
      const db = client.db(dbname);
      _db = db
      done();
  });
};

get = () => {
  if(!_db) {
      throw new Error('Call connect first!');
  }

  return _db;
}

close = () => {
  _db.close();
}

module.exports = {
  connect,
  get,
  close
};
