'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configs = require('../constants/configs');

var _elasticsearch = require('elasticsearch');

exports.default = new _elasticsearch.Client({
  host: _configs.ELASTIC_SEARCH_HOST,
  log: 'trace'
});