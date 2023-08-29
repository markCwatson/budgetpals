import { Router } from 'express';

import { ValidateFunction } from './';
import BudgetsController from '../controllers/BudgetsController';
import auth from '../middleware/auth';
import getRouteHandler from './routeHandler';

const routeConfig = (api: Router, validate: ValidateFunction) => {
  api.get('/budgets', auth, getRouteHandler(BudgetsController.getBudgets));

  api.get('/budget', auth, getRouteHandler(BudgetsController.getMyPlannedBudget));
};

export default routeConfig;
