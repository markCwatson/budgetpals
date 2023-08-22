import { NextFunction, Request, Response } from 'express';

import ApiError from '../errors/ApiError';
import ExpensesService, { Expense } from '../services/ExpensesService';
import AuthService from '../services/AuthService';

class ExpensesController {
  static async addExpense(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const account = AuthService.getAccountFromLocals(res.locals);

    const expenseIsAdded = await ExpensesService.addExpenseByUserId(
      account._id,
      req.body as Expense,
    );

    if (!expenseIsAdded) {
      throw new ApiError({
        code: 400,
        message: 'Bad request',
        explanation: 'Unable to add expense',
      });
    }

    res.status(200).json({ message: 'expense added' });
  }

  static async getExpenses(req: Request, res: Response): Promise<void> {
    const account = AuthService.getAccountFromLocals(res.locals);

    const expenses = await ExpensesService.getExpensesByUserId(account._id);
    res.status(200).send(expenses);
  }

  static async getCategoryNames(req: Request, res: Response): Promise<void> {
    AuthService.getAccountFromLocals(res.locals);

    const categories = await ExpensesService.getCategoryNames();
    res.status(200).send(categories);
  }

  static async getFrequencyNames(req: Request, res: Response): Promise<void> {
    AuthService.getAccountFromLocals(res.locals);

    const frequencies = await ExpensesService.getFrequencyNames();
    res.status(200).send(frequencies);
  }

  static async deleteExpense(req: Request, res: Response): Promise<void> {
    const account = AuthService.getAccountFromLocals(res.locals);

    const { id } = req.params;
    if (!id) {
      throw new ApiError({
        code: 400,
        message: 'Missing expense id',
        explanation: 'You must provide an expense id to delete',
      });
    }

    const result = await ExpensesService.deleteExpenseById(account._id, id);
    if (!result) {
      throw new ApiError({
        code: 400,
        message: 'Unable to delete expense',
        explanation: 'Something went wrong while deleting the expense',
      });
    }

    res.status(200).json({ message: 'expense deleted' });
  }
}

export default ExpensesController;
