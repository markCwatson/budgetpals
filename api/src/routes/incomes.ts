import { Router, RequestHandler } from 'express';

import getRouteHandler from './routeHandler';
import IncomesController from '../controllers/IncomesController';

import AddIncomeSchema from '../requests/AddIncomeSchema.json';

type ValidateFunction = (schema: { body?: any }) => RequestHandler;

const routeConfig = (api: Router, validate: ValidateFunction) => {
  const handler: RequestHandler = getRouteHandler(IncomesController.addIncome);

  // \todo make this an authenticated route
  api.post('/incomes', validate({ body: AddIncomeSchema }), handler);
};

export default routeConfig;
