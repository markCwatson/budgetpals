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
    res.status(200).send(budget);
  };

  static getBudgetPeriods: ActionFunction = async (req, res, next) => {
    const periods = await BudgetsService.getBudgetPeriods();
    res.status(200).send(periods);
  };
}

export default BudgetsController;
