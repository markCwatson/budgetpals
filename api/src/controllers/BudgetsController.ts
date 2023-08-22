import BudgetsService from '../services/BudgetsService';

class BudgetsController {
  static async getBudgets(req, res) {
    const budgets = await BudgetsService.getAllBudgets();
    return res.status(200).json(budgets);
  }
}

export default BudgetsController;
