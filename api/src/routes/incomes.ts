import { Router, RequestHandler } from 'express';

import auth from '../middleware/auth';
import getRouteHandler from './routeHandler';
import IncomesController from '../controllers/IncomesController';
import AddIncomeSchema from '../requests/AddIncomeSchema.json';

type ValidateFunction = (schema: { body?: any }) => RequestHandler;

const routeConfig = (api: Router, validate: ValidateFunction) => {
  api.put(
    '/incomes',
    auth,
    validate({ body: AddIncomeSchema }),
    getRouteHandler(IncomesController.addIncome),
  );

  api.get('/incomes', auth, getRouteHandler(IncomesController.getIncomes));

  api.delete(
    '/incomes/:id',
    auth,
    getRouteHandler(IncomesController.deleteIncome),
  );
};

export default routeConfig;
