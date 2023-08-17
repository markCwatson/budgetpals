import { Router, RequestHandler } from 'express';

import auth from '../middleware/auth';
import getRouteHandler from './routeHandler';
import UsersController from '../controllers/UsersController';

import CreateUserSchema from '../requests/CreateUserSchema.json';
import AddExpenseSchema from '../requests/AddExpenseSchema.json';
import AddIncomeSchema from '../requests/AddIncomeSchema.json';

type ValidateFunction = (schema: { body?: any }) => RequestHandler;

const routeConfig = (api: Router, validate: ValidateFunction) => {
  api.post(
    '/users',
    validate({ body: CreateUserSchema }),
    getRouteHandler(UsersController.createUser),
  );

  api.put(
    '/users/incomes',
    auth,
    validate({ body: AddIncomeSchema }),
    getRouteHandler(UsersController.addIncome),
  );

  api.get('/users/incomes', auth, getRouteHandler(UsersController.getIncomes));

  api.put(
    '/users/expenses',
    auth,
    validate({ body: AddExpenseSchema }),
    getRouteHandler(UsersController.addExpense),
  );

  api.get(
    '/users/expenses',
    auth,
    getRouteHandler(UsersController.getExpenses),
  );
};

export default routeConfig;
