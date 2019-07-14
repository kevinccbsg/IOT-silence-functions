module.exports = {
  server: {
    host: '0.0.0.0',
    port: 3000,
    shutdown: { delay: '5s' },
  },
  store: {
    dbName: 'time-off',
    url: process.env.MONGO_URL,
  },
  bus: {
    url: process.env.BUS_URL,
    extra: '',
  },
  controller: {
    urlWebhook: process.env.WEBHOOK,
    method: 'post',
  },
  service: { reload: { window: '60s' } },
  logger: {
    transport: 'bunyan',
    include: [
      'tracer',
      'timestamp',
      'level',
      'message',
      'error.message',
      'error.code',
      'error.stack',
      'request.url',
      'request.headers',
      'request.params',
      'request.method',
      'response.statusCode',
      'response.headers',
      'response.time',
      'process',
      'system',
      'package.name',
      'mongo',
      'service',
    ],
    exclude: [
      'password',
      'secret',
      'token',
      'request.headers.cookie',
      'dependencies',
      'devDependencies',
    ],
  },
};
