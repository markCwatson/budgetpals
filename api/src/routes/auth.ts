const getRouteHandler = require('./routeHandler');
const authSchema = require('../requests/AuthSchema.json');

module.exports = (api, validate) => {
  // obtain tokens by username/password
  api.post(
    '/auth/token',
    validate({ body: authSchema }),
    getRouteHandler(async (req, res) => {
      console.log('Test of POST /api/auth/token');
      res.status(200).send({ message: 'POST /api/auth/token' });
    }),
  );
};
