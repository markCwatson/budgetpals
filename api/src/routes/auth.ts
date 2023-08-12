import getRouteHandler from './routeHandler';
import AuthController from '../controllers/AuthController';
import AuthSchema from '../requests/AuthSchema.json';
import { Express, RequestHandler } from 'express';

type ValidateFunction = (schema: { body: typeof AuthSchema }) => RequestHandler;

const routeConfig = (api: Express, validate: ValidateFunction) => {
  const handler: RequestHandler = getRouteHandler(AuthController.token);

  // obtain tokens by username/password
  api.post('/auth/token', validate({ body: AuthSchema }), handler);
};

export default routeConfig;
