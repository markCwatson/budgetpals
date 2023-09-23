import express, { RequestHandler, Router } from 'express';
import { Validator } from 'express-json-validator-middleware';

import home from './home';
import auth from './auth';
import users from './users';
import expenses from './expenses';
import incomes from './incomes';
import budgets from './budgets';

export type ValidateFunction = (schema: { body?: any }) => RequestHandler;

export default (app: express.Application) => {
  const { validate } = new Validator({});
  const api = Router();

  home(api);
  auth(api, validate);
  users(api, validate);
  expenses(api, validate);
  incomes(api, validate);
  budgets(api, validate);

  app.use('/api', api);
};
