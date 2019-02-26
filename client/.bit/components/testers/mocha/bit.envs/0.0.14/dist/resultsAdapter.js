'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bitUtilsValidation = require('@bit/bit.utils.validation.empty');

var _bitUtilsValidation2 = _interopRequireDefault(_bitUtilsValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var normalizeError = function normalizeError(err) {
  return {
    message: err.message,
    stack: err.stack
  };
};

var normalizeStats = function normalizeStats(stats) {
  return {
    start: stats.start,
    end: stats.end
  };
};

var normalizeTest = function normalizeTest(test) {
  var isError = !(0, _bitUtilsValidation2.default)(test.err);

  return {
    title: test.fullTitle,
    pass: !isError,
    err: isError ? normalizeError(test.err) : null,
    duration: test.duration
  };
};

var normalizeFailure = function normalizeFailure(failure) {
  var isError = !(0, _bitUtilsValidation2.default)(failure.err);

  return {
    title: failure.fullTitle,
    err: isError ? normalizeError(failure.err) : null,
    duration: failure.duration
  };
};

var convertMochaFormatToBitFormat = function convertMochaFormatToBitFormat(mochaJsonResults) {
  return {
    tests: mochaJsonResults.tests.map(normalizeTest),
    stats: normalizeStats(mochaJsonResults.stats),
    failures: mochaJsonResults.generalFailures.map(normalizeFailure)
  };
};

exports.default = convertMochaFormatToBitFormat;
module.exports = exports['default'];

//# sourceMappingURL=resultsAdapter.js.map