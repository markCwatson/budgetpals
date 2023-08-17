import { Request, Response } from 'express';

import ApiError from '../errors/ApiError';
import UsersService from '../services/UsersService';

class UsersController {
  static async createUser(req, res): Promise<void> {
    const user = await UsersService.create(req.body);
    res.status(200).send({ user });
  }

  static async addIncome(req: Request, res: Response): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      throw new ApiError({
        code: 401,
        message: 'Unauthorized',
        explanation: 'You must be logged in to add an income',
      });
    }

    if (!UsersService.addIncomeByUserId(account._id, req.body)) {
      throw new ApiError({
        code: 400,
        message: 'Unable to add income',
        explanation: 'Something went wrong while adding the income',
      });
    }

    res.status(200).send({ message: 'Income added' });
  }

  static addExpense(req, res) {
    const account = res.locals['user'];
    if (!account) {
      throw new ApiError({
        code: 401,
        message: 'Unauthorized',
        explanation: 'You must be logged in to add an income',
      });
    }

    if (!UsersService.addExpenseByUserId(account._id, req.body)) {
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

    const expenses = await UsersService.getExpensesByUserId(account._id);
    res.status(200).send(expenses);
  }

  static async getIncomes(req: Request, res: Response): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      throw new ApiError({
        code: 401,
        message: 'Unauthorized',
        explanation: 'You must be logged in to get all incomes',
      });
    }

    const incomes = await UsersService.getIncomesByUserId(account._id);
    res.status(200).send(incomes);
  }
}

export default UsersController;
