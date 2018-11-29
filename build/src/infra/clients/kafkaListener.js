'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configs = require('../constants/configs');

var _kafkaNode = require('kafka-node');

var _kafkaNode2 = _interopRequireDefault(_kafkaNode);

var _elasticSearch = require('./elasticSearch');

var _elasticSearch2 = _interopRequireDefault(_elasticSearch);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KafkaClient = _kafkaNode2.default.KafkaClient,
    Consumer = _kafkaNode2.default.Consumer;

var topics = [{ topic: 'CustomerEvents', partition: 0 }];
var kafkaOptions = {
  autoCommit: true
};

var kafkaClient = new KafkaClient({ kafkaHost: _configs.KAFKA_HOST });
var consumer = new Consumer(kafkaClient, topics, kafkaOptions);
var log = (0, _logger2.default)();

_elasticSearch2.default.ping({
  requestTimeout: 1000
}, function (error) {
  error && log.error('Elasticsearch cluster is down!');
  !error && log.info('All is well with elastic search');
});

exports.default = function () {
  return consumer.on('message', function (message) {
    log.info('New Event posted on kafka topic: CustomerEvents');
    log.info(message);

    var value = message.value;

    var customer = JSON.parse(value).data;

    _elasticSearch2.default.create({
      index: 'cpf',
      type: 'Customer',
      id: customer.cpf,
      body: customer
    }).then(function () {
      return log.info('Inserted on elastic search');
    }).catch(function (err) {
      return log.error(err);
    });
  });
};