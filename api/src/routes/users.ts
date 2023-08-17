import { Router, RequestHandler } from 'express';

import auth from '../middleware/auth';
import getRouteHandler from './routeHandler';
import UsersController from '../controllers/UsersController';

import CreateUserSchema from '../requests/CreateUserSchema.json';

type ValidateFunction = (schema: { body?: any }) => RequestHandler;

const routeConfig = (api: Router, validate: ValidateFunction) => {
  api.post(
    '/users',
    validate({ body: CreateUserSchema }),
    getRouteHandler(UsersController.createUser),
  );

  api.get('/users', auth, getRouteHandler(UsersController.getUsers));

  api.delete('/users', auth, getRouteHandler(UsersController.deleteUser));
};

export default routeConfig;
