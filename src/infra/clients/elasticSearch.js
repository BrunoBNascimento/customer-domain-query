import { ELASTIC_SEARCH_HOST } from '../constants/configs'
import { Client } from 'elasticsearch'

export default new Client({
  host: ELASTIC_SEARCH_HOST,
  log: 'trace'
})