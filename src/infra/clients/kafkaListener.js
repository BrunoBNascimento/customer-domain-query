import { KAFKA_HOST } from '../constants/configs'
import kafka from 'kafka-node'
import elastisearchClient from './elasticSearch'
import Logger from '../logger'

const { KafkaClient, Consumer } = kafka
const topics = [
  { topic: 'CustomerEvents', partition: 0 }
]
const kafkaOptions = {
  autoCommit: true
}

const kafkaClient = new KafkaClient({ kafkaHost: KAFKA_HOST })
const consumer = new Consumer(kafkaClient, topics, kafkaOptions)
const log = Logger()

elastisearchClient.ping({
  requestTimeout: 1000
}, error => {
  error && log.error('Elasticsearch cluster is down!')
  !error && log.info('All is well with elastic search')
})

export default () => (
  consumer.on('message', message => {
    log.info('New Event posted on kafka topic: CustomerEvents')
    log.info(message)

    const { value } = message
    const customer = JSON.parse(value).data

    elastisearchClient.create({
      index: 'cpf',
      type: 'Customer',
      id: customer.cpf,
      body: customer
    })
      .then(() => log.info('Inserted on elastic search'))
      .catch((err) => log.error(err))
  })
)
