const { MongoClient } = require('mongodb');
const { requestSilence, requestSilenceOff, isSilenceRequested } = require('./storeAPI');

module.exports = () => {
  const start = async ({ config }) => {
    const { url, dbName } = config;
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    const db = client.db(dbName);

    const requestColllection = db.collection('requests');

    const api = ({ request }) => ({
      requestSilence: requestSilence(request),
      requestSilenceOff: requestSilenceOff(request),
      isSilenceRequested: isSilenceRequested(request),
    });

    return api({ request: requestColllection });
  };

  return { start };
};

