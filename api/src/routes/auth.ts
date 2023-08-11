import getRouteHandler from './routeHandler';
import AuthController from '../controllers/AuthController';

import authSchema from '../requests/AuthSchema.json';

export default (api, validate) => {
  // obtain tokens by username/password
  api.post(
    '/auth/token',
    validate({ body: authSchema }),
    getRouteHandler(AuthController.token),
  );
};
