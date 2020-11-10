const addRequestId = require('express-request-id')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//var methodOverride = require('method-override');
const passport = require('passport');

const questions = require('./routes/api/questions');

const app = require('express')();
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));             // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(methodOverride());

app.use(addRequestId);

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

// Passport middleware
//app.use(passport.initialize());

// Passport Config
//require('./config/passport')(passport);

  // Use Routes
app.use('/api/questions', questions);

module.exports = { app };