const expressJSDocSwagger = require('express-jsdoc-swagger');

module.exports = () => {
  const start = ({ manifest = {}, app, config }, cb) => {
    const { swaggerOptions } = config;
    expressJSDocSwagger(app)(swaggerOptions);

    /**
     * GET /__/manifest
     * @summary Get manifest state
     * @tags admin - Everything about admin tasks
     * @return {object} default - Return manifest file
     */
    app.get('/__/manifest', (req, res) => res.json(manifest));

    cb();
  };

  return { start };
};
