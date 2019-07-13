const { sendMessage } = require('../../lib/request');

module.exports = () => {
  const start = async ({ store, config }) => {
    const mensageSender = sendMessage(config.urlWebhook);
    const requestSilenceTime = async ({ userId, reason, ...rest }) => {
      await store.requestSilence({ userId, reason, ...rest });
      await mensageSender(`<@${userId}> request silence with this reason "${reason}"`);
      // Send message
    };

    const requestSoundTime = async ({ userId, reason, ...rest }) => {
      await store.requestSilenceOff({ userId, reason, ...rest });
      const isSilence = await store.isSilenceRequested();
      if (isSilence) {
        // send message
      }
    };

    const api = {
      requestSilenceTime,
      requestSoundTime,
    };
    return api;
  };

  return { start };
};

