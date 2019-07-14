const System = require('systemic');
const store = require('./initStore');

module.exports = new System({ name: 'store' })
  .add('store', store())
  .dependsOn('config', 'logger');
