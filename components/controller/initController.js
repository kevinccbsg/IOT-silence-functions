const { sendMessage } = require('../../lib/request');

module.exports = () => {
  const start = async ({ store, config, bus, logger }) => {
    const sendSignOn = bus.publish('send-sign-on');
    const sendSignOff = bus.publish('send-sign-off');

    const mensageSender = sendMessage(config.urlWebhook);
    const requestSilenceTime = async ({ userId, reason, ...rest }) => {
      await store.requestSilence({ userId, reason, ...rest });
      await mensageSender(`<@${userId}> request silence with this reason "${reason}"`);
      // Send message
      try {
        sendSignOn(`${userId} request light on`);
      } catch (err) {
        logger.error(err);
      }
    };

    const requestSoundTime = async ({ userId, reason, ...rest }) => {
      await store.requestSilenceOff({ userId, reason, ...rest });
      const isSilence = await store.isSilenceRequested();
      if (isSilence) {
        // send message
        try {
          sendSignOff(`${userId} request light off`);
        } catch (err) {
          logger.error(err);
        }
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

