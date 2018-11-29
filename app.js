import express from 'express'
import routes from './src/infra/routes'
import kafkaListener from './src/infra/clients/kafkaListener'
import Logger from './src/infra/logger'

const port = 3000
const app = express()
const log = Logger()

for (const route of routes) {
  const { method, controller, path } = route
  app[method](path, controller)
}

//health check
app.get('/', (req, res) => res.json({ message: 'Server is running' }))

app.listen(port, () => {
  log.info('Preparing kafka listener')
  kafkaListener()
  log.info(`Server is running at localhost:${port}`)
})