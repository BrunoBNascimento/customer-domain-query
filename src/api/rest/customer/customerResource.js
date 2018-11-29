import elastisearchClient from '../../../infra/clients/elasticSearch'

export const getCustomers = async (req, res) => {
  const customers = await elastisearchClient.search()
  res.send(customers)
}