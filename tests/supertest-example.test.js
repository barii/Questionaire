it('should ', () => {
  
});

// const request = require('supertest');
// const express = require('express');

// const app = express();

// app.get('/user', function(req, res) {
//   res.status(200).json({ name: 'john' });
// });

// request(app)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });
// Here's an example with mocha, note how you can pass done straight to any of the .expect() calls:

// describe('GET /user', function() {
//   it('respond with json', function(done) {
//     request(app)
//       .get('/user')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, done);
//   });
// });
// One thing to note with the above statement is that superagent now sends any HTTP error (anything other than a 2XX response code) to the callback as the first argument if you do not add a status code expect (i.e. .expect(302)).

// If you are using the .end() method .expect() assertions that fail will not throw - they will return the assertion as an error to the .end() callback. In order to fail the test case, you will need to rethrow or pass err to done(), as follows:

// describe('POST /users', function() {
//   it('responds with json', function(done) {
//     request(app)
//       .post('/users')
//       .send({name: 'john'})
//       .set('Accept', 'application/json')
//       .expect(200)
//       .end(function(err, res) {
//         if (err) return done(err);
//         done();
//       });
//   });
// });
// You can also use promises

// describe('GET /users', function() {
//   it('responds with json', function() {
//     return request(app)
//       .get('/users')
//       .set('Accept', 'application/json')
//       .expect(200)
//       .then(response => {
//           assert(response.body.email, 'foo@bar.com')
//       })
//   });
// });
// Expectations are run in the order of definition. This characteristic can be used to modify the response body or headers before executing an assertion.

// describe('POST /user', function() {
//   it('user.name should be an case-insensitive match for "john"', function(done) {
//     request(app)
//       .post('/user')
//       .send('name=john') // x-www-form-urlencoded upload
//       .set('Accept', 'application/json')
//       .expect(function(res) {
//         res.body.id = 'some fixed id';
//         res.body.name = res.body.name.toLowerCase();
//       })
//       .expect(200, {
//         id: 'some fixed id',
//         name: 'john'
//       }, done);
//   });
// });
// Anything you can do with superagent, you can do with supertest - for example multipart file uploads!

// request(app)
// .post('/')
// .field('name', 'my awesome avatar')
// .attach('avatar', 'test/fixtures/avatar.jpg')
// ...
// Passing the app or url each time is not necessary, if you're testing the same host you may simply re-assign the request variable with the initialization app or url, a new Test is created per request.VERB() call.

// request = request('http://localhost:5555');

// request.get('/').expect(200, function(err){
//   console.log(err);
// });

// request.get('/').expect('heya', function(err){
//   console.log(err);
// });
// Here's an example with mocha that shows how to persist a request and its cookies:

// const request = require('supertest');
// const should = require('should');
// const express = require('express');
// const cookieParser = require('cookie-parser');

// describe('request.agent(app)', function() {
//   const app = express();
//   app.use(cookieParser());

//   app.get('/', function(req, res) {
//     res.cookie('cookie', 'hey');
//     res.send();
//   });

//   app.get('/return', function(req, res) {
//     if (req.cookies.cookie) res.send(req.cookies.cookie);
//     else res.send(':(')
//   });

//   const agent = request.agent(app);

//   it('should save cookies', function(done) {
//     agent
//     .get('/')
//     .expect('set-cookie', 'cookie=hey; Path=/', done);
//   });

//   it('should send cookies', function(done) {
//     agent
//     .get('/return')
//     .expect('hey', done);
//   });
// })