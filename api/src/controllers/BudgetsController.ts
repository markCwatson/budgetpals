import { NextFunction, Request, Response } from 'express';

import BudgetsService from '../services/BudgetsService';

class BudgetsController {
  static async getBudgets(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const budgets = await BudgetsService.getAllBudgets();
    res.status(200).send(budgets);
  }
}

export default BudgetsController;
