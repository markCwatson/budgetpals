import BudgetsService from '../services/BudgetsService';
import { ActionFunction } from '../routes/routeHandler';
import AuthService from '../services/AuthService';

class BudgetsController {
  static getBudgets: ActionFunction = async (req, res, next) => {
    const budgets = await BudgetsService.getAllBudgets();
    res.status(200).send(budgets);
  };

  static getMyPlannedBudget: ActionFunction = async (req, res, next) => {
    const account = AuthService.getAccountFromLocals(res.locals);
    const budget = await BudgetsService.getMyPlannedBudget(account._id);
    res.status(200).send(budget);
  }
}

export default BudgetsController;
