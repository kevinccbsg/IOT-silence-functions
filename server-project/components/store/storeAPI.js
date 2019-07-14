const crypto = require('crypto');
const { errorFactory } = require('../../lib/errors');

const wrongInputError = errorFactory('wrong_input');

const saveRequest = async (collection, request) => {
  let newRequest = { ...request };
  const requestId = crypto.createHash('md5').update(JSON.stringify(newRequest)).digest('hex');
  newRequest = {
    ...newRequest,
    requestId,
    created_on: new Date(),
  };
  await collection.insertOne(newRequest);
};

const requestSilence = collection => async ({ reason, userId, ...rest }) => {
  const hasOneRequest = await collection.findOne({
    userId,
    type: 'silence',
    active: true,
  }, {
    _id: 0,
    active: 1,
  });
  if (hasOneRequest) {
    throw wrongInputError('Already request silence');
  }
  const newRequest = {
    reason,
    userId,
    active: true,
    type: 'silence',
    slack_extra_info: { ...rest },
  };
  await saveRequest(collection, newRequest);
  return newRequest;
};

const requestSilenceOff = collection => async ({ reason, userId, ...rest }) => {
  await collection.updateMany({ userId, type: 'silence' }, { $set: { active: false } }, { multi: true });
  const newRequest = {
    reason,
    userId,
    type: 'silence-off',
    slack_extra_info: { ...rest },
  };
  await saveRequest(collection, newRequest);
};

const isSilenceRequested = collection => async () => {
  const results = await collection.findOne({ active: true });
  return !!results;
};

module.exports = {
  requestSilence,
  requestSilenceOff,
  isSilenceRequested,
};
