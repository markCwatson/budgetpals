import BudgetsService from '../services/BudgetsService';
import { ActionFunction } from '../routes/routeHandler';
import AuthService from '../services/AuthService';

class BudgetsController {
  static createBudget: ActionFunction = async (req, res, next) => {
    const account = AuthService.getAccountFromLocals(res.locals);
    const { startDate, period, startAccountBalance } = req.body;
    const success = await BudgetsService.configureBudgetByUserId(account._id, {
      startDate,
      period,
      startAccountBalance,
    });
    if (success) {
      res.status(201).send({ success: true });
    } else {
      res.status(400).send({ success: false });
    }
  };

  static getBudgets: ActionFunction = async (req, res, next) => {
    const budgets = await BudgetsService.getAllBudgets();
    res.status(200).send(budgets);
  };

  static getMyBudget: ActionFunction = async (req, res, next) => {
    const account = AuthService.getAccountFromLocals(res.locals);
    const budget = await BudgetsService.getMyBudgetByUserId(account._id);
    if (!budget) {
      res.status(400).send({ message: 'Budget not found' });
      return;
    }
    res.status(200).send(budget);
  };
}

export default BudgetsController;
