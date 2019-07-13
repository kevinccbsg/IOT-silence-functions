const expect = require('expect.js');
const system = require('../system');
const supertest = require('supertest');

describe('Service Tests', () => {
  let request;
  const sys = system();

  before(done => {
    sys.start((err, { app }) => {
      if (err) return done(err);
      request = supertest(app);
      done();
    });
  });

  after(() => sys.stop());

  it('should return manifest', () =>
    request
      .get('/__/manifest')
      .expect(200)
      .then((response) => {
        expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
      }));
});
