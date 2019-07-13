const axios = require('axios');

const sendMessage = url => text =>
  axios.post(url, { text });

module.exports = { sendMessage };
