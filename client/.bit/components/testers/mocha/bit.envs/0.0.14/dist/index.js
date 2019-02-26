'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsdom = require('jsdom');

var _resultsAdapter = require('./resultsAdapter');

var _resultsAdapter2 = _interopRequireDefault(_resultsAdapter);

var _mocha = require('mocha');

var _mocha2 = _interopRequireDefault(_mocha);

var _jsonReporter = require('./jsonReporter');

var _jsonReporter2 = _interopRequireDefault(_jsonReporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var document = new _jsdom.JSDOM('<!doctype html><html><body></body></html>').window.document;


var run = function run(specFile) {
  return new Promise(function (resolve) {
    var mocha = new _mocha2.default({ reporter: _jsonReporter2.default });
    mocha.addFile(specFile);
    mocha.run().on('end', function () {
      // eslint-disable-line
      return resolve((0, _resultsAdapter2.default)(this.testResults));
    });
  });
};

exports.default = {
  run: run,
  globals: {
    window: document.defaultView,
    navigator: { userAgent: 'node.js' }
  }
};
module.exports = exports['default'];

//# sourceMappingURL=index.js.map