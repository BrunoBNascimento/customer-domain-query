'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prettyLogger = require('pretty-logger');

var _prettyLogger2 = _interopRequireDefault(_prettyLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var customConfig = {
    showMillis: true,
    showTimestamp: true
  };

  return new _prettyLogger2.default(customConfig);
};