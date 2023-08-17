import { Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import ExpensesService, { Expense } from '../services/ExpensesService';

class ExpensesController {
  static async addExpense(req: Request, res: Response): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      throw new ApiError({
        code: 401,
        message: 'Unauthorized',
        explanation: 'You must be logged in to add an income',
      });
    }

    if (!ExpensesService.addExpenseByUserId(account._id, req.body as Expense)) {
      throw new ApiError({
        code: 400,
        message: 'Unable to add expense',
        explanation: 'Something went wrong while adding the expense',
      });
    }

    res.status(200).json({ message: 'expense added' });
  }

  static async getExpenses(req: Request, res: Response): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      throw new ApiError({
        code: 401,
        message: 'Unauthorized',
        explanation: 'You must be logged in to get all expenses',
      });
    }

    const expenses = await ExpensesService.getExpensesByUserId(account._id);
    res.status(200).send(expenses);
  }

  static async deleteExpense(req: Request, res: Response): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      throw new ApiError({
        code: 401,
        message: 'Unauthorized',
        explanation: 'You must be logged in to delete an expense',
      });
    }

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
