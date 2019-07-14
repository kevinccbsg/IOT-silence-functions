const System = require('systemic');
const { join } = require('path');

module.exports = () => new System({ name: 'IOT-silence-functions' }).bootstrap(join(__dirname, 'components'));
