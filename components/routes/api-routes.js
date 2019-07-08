/* eslint no-unused-vars: "off" */

const bodyParser = require('body-parser');
const { BAD_REQUEST, FORBIDDEN, NOT_FOUND, CONFLICT } = require('http-status-codes');
const cors = require('cors');

module.exports = () => {
  const start = ({ app, controller, logger, config }, cb) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    const tagError = err => {
      const errors = {
        CredentialError: FORBIDDEN,
        InputError: BAD_REQUEST,
        ConflictError: CONFLICT,
        NotFoundError: NOT_FOUND,
      };

      return errors[err.name];
    };

    const handleError = (err, req, res, next) => {
      err.statusCode = tagError(err);
      logger.error(`${err.message} - ${err.stack}`);
      res.status(err.statusCode || 500).json({ type: err.name, message: err.message, extra: err.extra });
    };

    app.get('/', (req, res) => {
      res.send('IOT functions');
    });

    app.post('/slack/silence', (req, res) => {
      console.log('Send command');
      console.log(req.query);
      console.log(req.params);
      console.log(req.body);
      console.log('Response sended');
      res.json({ sucess: true });
    });


    app.use(handleError);

    cb();
  };

  return { start };
};
