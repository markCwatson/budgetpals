import { Router } from 'express';

import { ValidateFunction } from './';
import BudgetsController from '../controllers/BudgetsController';
import auth from '../middleware/auth';
import getRouteHandler from './routeHandler';
import CreateBudgetSchema from '../requests/CreateBudgetSchema.json';

const routeConfig = (api: Router, validate: ValidateFunction) => {
  api.post(
    '/budget',
    auth,
    validate({ body: CreateBudgetSchema }),
    getRouteHandler(BudgetsController.createBudget),
  );

  api.get('/budgets', auth, getRouteHandler(BudgetsController.getBudgets));

  api.get('/budget', auth, getRouteHandler(BudgetsController.getMyBudget));

  api.get(
    '/budget/periods',
    auth,
    getRouteHandler(BudgetsController.getBudgetPeriods),
  );
};

export default routeConfig;
