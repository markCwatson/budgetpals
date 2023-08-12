import { Router, RequestHandler } from 'express';

import getRouteHandler from './routeHandler';

import UsersController from '../controllers/UsersController';

import CreateUserSchema from '../requests/CreateUserSchema.json';

type ValidateFunction = (schema: { body?: any }) => RequestHandler;

const routeConfig = (api: Router, validate: ValidateFunction) => {
  const handler: RequestHandler = getRouteHandler(UsersController.createUser);

  api.post('/users', validate({ body: CreateUserSchema }), handler);
};

export default routeConfig;
