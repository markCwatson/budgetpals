import { RequestHandler, Router } from 'express';
import { Validator } from 'express-json-validator-middleware';

import auth from './auth';
import users from './users';
import expenses from './expenses';
import incomes from './incomes';
import budgets from './budgets';

export type ValidateFunction = (schema: { body?: any }) => RequestHandler;

export default (app) => {
  const { validate } = new Validator({});
  const api = Router();

  auth(api, validate);
  users(api, validate);
  expenses(api, validate);
  incomes(api, validate);
  budgets(api, validate);

  app.use('/api', api);
};
