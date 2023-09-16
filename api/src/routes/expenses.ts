import { Router } from 'express';

import { ValidateFunction } from './';
import auth from '../middleware/auth';
import getRouteHandler from './routeHandler';
import ExpensesController from '../controllers/ExpensesController';

import AddExpenseSchema from '../requests/AddExpenseSchema.json';

const routeConfig = (api: Router, validate: ValidateFunction) => {
  api.put(
    '/expenses',
    auth,
    validate({ body: AddExpenseSchema }),
    getRouteHandler(ExpensesController.addExpense),
  );

  api.get('/expenses', auth, getRouteHandler(ExpensesController.getExpenses));
  api.get('/expenses/:id', auth, getRouteHandler(ExpensesController.getExpenseById));

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
