const crypto = require('crypto');

const saveRequest = async (collection, request) => {
  let newRequest = { ...request };
  const requestId = crypto.createHash('md5').update(JSON.stringify(newRequest)).digest('hex');
  newRequest = {
    ...newRequest,
    requestId,
  };
  await collection.insertOne(newRequest);
};

const requestSilence = collection => async ({ reason, email }) => {
  const hasOneRequest = await collection.findOne({
    email,
    type: 'silence',
    active: true,
  }, {
    _id: 0,
    active: 1,
  });
  if (!hasOneRequest && hasOneRequest.active) {
    throw new Error('Already request silence');
  }
  const newRequest = {
    reason,
    email,
    active: true,
    type: 'silence',
  };
  await saveRequest(collection)(newRequest);
  return newRequest;
};

const requestSilenceOff = collection => async ({ reason, email }) => {
  await collection.update({ email, type: 'silence' }, { $set: { active: false } });
  const newRequest = {
    reason,
    email,
    type: 'silence-off',
  };
  await saveRequest(collection)(newRequest);
};

module.exports = {
  requestSilence,
  requestSilenceOff,
};
