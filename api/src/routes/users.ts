import getRouteHandler from './routeHandler';
import UsersController from '../controllers/UsersController';

import CreateUserSchema from '../requests/CreateUserSchema.json';

import { Express, RequestHandler } from 'express';

type ValidateFunction = (schema: {
  body: typeof CreateUserSchema;
}) => RequestHandler;

const routeConfig = (api: Express, validate: ValidateFunction) => {
  const handler: RequestHandler = getRouteHandler(UsersController.createUser);

  api.post('/users', validate({ body: CreateUserSchema }), handler);
};

export default routeConfig;
