require('dotenv').config();
const System = require('systemic');
const initBus = require('./initBus');

module.exports = new System({ name: 'bus' })
  .add('bus', initBus())
  .dependsOn('logger', 'config');
