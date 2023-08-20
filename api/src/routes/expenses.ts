import { RequestHandler, Router } from 'express';

import auth from '../middleware/auth';
import getRouteHandler from './routeHandler';
import ExpensesController from '../controllers/ExpensesController';

import AddExpenseSchema from '../requests/AddExpenseSchema.json';

type ValidateFunction = (schema: { body?: any }) => RequestHandler;

const routeConfig = (api: Router, validate: ValidateFunction) => {
  api.put(
    '/expenses',
    auth,
    validate({ body: AddExpenseSchema }),
    getRouteHandler(ExpensesController.addExpense),
  );

  api.get('/expenses', auth, getRouteHandler(ExpensesController.getExpenses));

  api.delete(
    '/expenses/:id',
    auth,
    getRouteHandler(ExpensesController.deleteExpense),
  );

  api.get(
    '/expenses/categories',
    auth,
    getRouteHandler(ExpensesController.getCategoryNames),
  );

  api.get(
    '/expenses/frequencies',
    auth,
    getRouteHandler(ExpensesController.getFrequencyNames),
  );
};

export default routeConfig;
