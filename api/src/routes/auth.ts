import getRouteHandler from './routeHandler';
import AuthController from '../controllers/AuthController';
import AuthSchema from '../requests/AuthSchema.json';
import { Router, RequestHandler } from 'express';

type ValidateFunction = (schema: { body?: any }) => RequestHandler;

const routeConfig = (api: Router, validate: ValidateFunction) => {
  const handler: RequestHandler = getRouteHandler(AuthController.token);

  // obtain tokens by username/password
  api.post('/auth/token', validate({ body: AuthSchema }), handler);
};

export default routeConfig;
