'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCustomers = undefined;

var _elasticSearch = require('../../../infra/clients/elasticSearch');

var _elasticSearch2 = _interopRequireDefault(_elasticSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCustomers = exports.getCustomers = async function getCustomers(req, res) {
  var customers = await _elasticSearch2.default.search();
  res.send(customers);
};