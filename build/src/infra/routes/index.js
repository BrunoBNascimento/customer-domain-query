'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _customerResource = require('../../api/rest/customer/customerResource');

exports.default = [{
  method: 'get',
  controller: _customerResource.getCustomers,
  path: '/customers'
}];