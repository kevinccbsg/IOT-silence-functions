
module.exports = () => {
  const start = async ({ store }) => {
    const requestSilenceTime = ({ email, reason }) => {
      store.saveRequestSilence({ email, reason });
    };

    const requestSoundTime = ({ email, reason }) => {
      store.requestSilenceOff({ email, reason });
    };

    const api = {
      requestSilenceTime,
      requestSoundTime,
    };
    return api;
  };

  return { start };
};

