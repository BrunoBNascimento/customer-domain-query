import Logger from 'pretty-logger'

export default () => {
  const customConfig = {
    showMillis: true,
    showTimestamp: true,
  }

  return new Logger(customConfig)
}