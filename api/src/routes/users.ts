import { Router } from 'express';

import { ValidateFunction } from './';
import auth from '../middleware/auth';
import getRouteHandler from './routeHandler';
import UsersController from '../controllers/UsersController';

import CreateUserSchema from '../requests/CreateUserSchema.json';

const routeConfig = (api: Router, validate: ValidateFunction) => {
  api.post(
    '/users',
    validate({ body: CreateUserSchema }),
    getRouteHandler(UsersController.createUser),
  );

  api.get('/users', auth, getRouteHandler(UsersController.getUsers));

  api.get('/users/me', auth, getRouteHandler(UsersController.getCurrentUser));

  api.delete('/users', auth, getRouteHandler(UsersController.deleteUser));
};

export default routeConfig;
