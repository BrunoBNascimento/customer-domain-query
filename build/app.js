'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./src/infra/routes');

var _routes2 = _interopRequireDefault(_routes);

var _kafkaListener = require('./src/infra/clients/kafkaListener');

var _kafkaListener2 = _interopRequireDefault(_kafkaListener);

var _logger = require('./src/infra/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 3000;
var app = (0, _express2.default)();
var log = (0, _logger2.default)();

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _routes2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var route = _step.value;
    var method = route.method,
        controller = route.controller,
        path = route.path;

    app[method](path, controller);
  }

  //health check
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

app.get('/', function (req, res) {
  return res.json({ message: 'Server is running' });
});

app.listen(port, function () {
  log.info('Preparing kafka listener');
  (0, _kafkaListener2.default)();
  log.info('Server is running at localhost:' + port);
});
