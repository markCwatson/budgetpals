const getRouteHandler = require('./routeHandler');
const authSchema = require('../requests/AuthSchema.json');

import AuthController from '../controllers/AuthController';

module.exports = (api, validate) => {
  // obtain tokens by username/password
  api.post(
    '/auth/token',
    validate({ body: authSchema }),
    getRouteHandler(AuthController.token),
  );
};
