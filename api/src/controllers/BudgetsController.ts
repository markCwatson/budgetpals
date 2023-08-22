import BudgetsService from '../services/BudgetsService';
import { ActionFunction } from '../routes/routeHandler';

class BudgetsController {
  static getBudgets: ActionFunction = async (req, res, next) => {
    const budgets = await BudgetsService.getAllBudgets();
    res.status(200).send(budgets);
  };
}

export default BudgetsController;
