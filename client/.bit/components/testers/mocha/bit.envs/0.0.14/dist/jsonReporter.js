'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseReporter = require('./baseReporter');

var _baseReporter2 = _interopRequireDefault(_baseReporter);

var _bitUtilsString = require('@bit/bit.utils.string.starts-with-one-of');

var _bitUtilsString2 = _interopRequireDefault(_bitUtilsString);

var _mochaHooksNames = require('./mochaHooksNames');

var _mochaHooksNames2 = _interopRequireDefault(_mochaHooksNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a plain-object representation of `test`, free of cyclic properties etc.
var clean = function clean(test) {
  return {
    title: test.title,
    fullTitle: test.fullTitle(),
    duration: test.duration,
    currentRetry: test.currentRetry(),
    err: errorJSON(test.err || {})
  };
};

// Transform `error` into a JSON object.
var errorJSON = function errorJSON(err) {
  var res = {};
  Object.getOwnPropertyNames(err).forEach(function (key) {
    res[key] = err[key];
  }, err);
  return res;
};

var JSONReporter = function JSONReporter(runner) {
  var results = (0, _baseReporter2.default)(runner);

  var tests = [];
  var pending = [];
  var failures = [];
  var passes = [];
  var generalFailures = [];

  runner.on('test end', function (test) {
    tests.push(test);
  });

  runner.on('pass', function (test) {
    passes.push(test);
  });

  runner.on('fail', function (test) {
    if ((0, _bitUtilsString2.default)(test.title, _mochaHooksNames2.default)) {
      generalFailures.push(test);
    } else {
      failures.push(test);
    }
  });

  runner.on('pending', function (test) {
    pending.push(test);
  });

  runner.on('end', function () {
    var obj = {
      stats: results.stats,
      tests: tests.map(clean),
      pending: pending.map(clean),
      failures: failures.map(clean),
      passes: passes.map(clean),
      generalFailures: generalFailures.map(clean)
    };

    runner.testResults = obj;
  });
};

exports.default = JSONReporter;
module.exports = exports['default'];

//# sourceMappingURL=jsonReporter.js.map