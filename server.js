const path = require('path');
const morgan = require('morgan');
const mongo = require('./mongoDb');

const { app } = require('./app');


morgan.token('id', function getId(req) {
  return req.id
});

//app.use(morgan('dev'));   
var loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

app.use(morgan(loggerFormat, {
  skip: function (req, res) {
      return res.statusCode < 400
  },
  stream: process.stderr
}));

app.use(morgan(loggerFormat, {
  skip: function (req, res) {
      return res.statusCode >= 400
  },
  stream: process.stdout
}));

// DB Config
const mongoURI = require('./config/keys').mongoURI;
const mongoDB = require('./config/keys').mongoDB;

mongo.connect(mongoURI, mongoDB, () => {
  //console.log(`MongoDB Connected to ${mongoURI}/${mongoDB}`)

  // Server static assets if in production
  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  const port = process.env.PORT || 5000;

  app.listen(port, () => { 
    console.log(`${process.env.NODE_ENV || "DEV"} server running on port ${port}`);
  })
})

module.exports = { app };