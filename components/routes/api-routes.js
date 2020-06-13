/* eslint no-unused-vars: "off" */

const bodyParser = require('body-parser');
const { BAD_REQUEST, FORBIDDEN, NOT_FOUND, CONFLICT } = require('http-status-codes');
const cors = require('cors');
const { handleError, httpErrorFactory } = require('../../lib/errors');

const buildBadRequestError = httpErrorFactory(BAD_REQUEST);
const buildNotFoundError = httpErrorFactory(NOT_FOUND);
const buildServerError = httpErrorFactory();

module.exports = () => {
  const start = ({ app, controller, logger, config }, cb) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    const tagError = err => {
      const errors = {
        not_found: buildNotFoundError(err.message, err.extra),
        server_error: buildServerError(err.message, err.extra),
        wrong_input: buildBadRequestError(err.message, err.extra),
      };
      return errors[err.type || 'server_error'];
    };

    /**
     * GET /
     * @summary Return API title or Info
     * @tags admin - Everything about admin tasks
     * @return {string} default - Return manifest file - text/html
     */
    app.get('/', (req, res) => {
      res.send('IOT functions');
    });

    /**
     * POST /slack/silence
     * @summary Request silence message
     * @tags Slack - Everything about slack integration
     * @param {SilenceRequest} request.body.required - Request object to ask for silence
     * @return {string} default - Return manifest file - text/plain
     */
    app.post('/slack/silence', async (req, res, next) => {
      const { text, user_id: userId } = req.body;
      try {
        await controller.requestSilenceTime({ reason: text, userId });
        return res.send('You request silence in the office');
      } catch (err) {
        const error = tagError(err);
        return res.send(error.message);
      }
    });

    /**
     * POST /slack/silence-off
     * @summary Request silence message
     * @tags Slack - Everything about slack integration
     * @param {SilenceRequest} request.body.required - Request object to ask for silence
     * @return {string} default - Return manifest file - text/plain
     */
    app.post('/slack/silence-off', async (req, res, next) => {
      const { text, user_id: userId } = req.body;
      try {
        await controller.requestSoundTime({ reason: text, userId });
        return res.send('You are done with your meeting');
      } catch (err) {
        const error = tagError(err);
        return res.send(error.message);
      }
    });

    app.use(handleError(logger));

    cb();
  };

  return { start };
};
