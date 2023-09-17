import { Router } from 'express';

import { ValidateFunction } from './';
import auth from '../middleware/auth';
import getRouteHandler from './routeHandler';
import IncomesController from '../controllers/IncomesController';
import AddIncomeSchema from '../requests/AddIncomeSchema.json';

const routeConfig = (api: Router, validate: ValidateFunction) => {
  api.put(
    '/incomes',
    auth,
    validate({ body: AddIncomeSchema }),
    getRouteHandler(IncomesController.addIncome),
  );

  api.get('/incomes', auth, getRouteHandler(IncomesController.getIncomes));
  api.get('/:id/incomes', auth, getRouteHandler(IncomesController.getIncomeById));


  api.delete(
    '/incomes/:id',
    auth,
    getRouteHandler(IncomesController.deleteIncome),
  );

  api.get(
    '/incomes/categories',
    auth,
    getRouteHandler(IncomesController.getIncomeCategoryNames),
  );

  api.get(
    '/incomes/frequencies',
    auth,
    getRouteHandler(IncomesController.getFrequencyNames),
  );
};

export default routeConfig;
