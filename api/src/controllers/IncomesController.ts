import { Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import IncomesService, { Income } from '../services/IncomesService';

class IncomesController {
  static async addIncome(req: Request, res: Response): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      throw new ApiError({
        code: 401,
        message: 'Unauthorized',
        explanation: 'You must be logged in to add an income',
      });
    }

    if (!IncomesService.addIncomeByUserId(account._id, req.body as Income)) {
      throw new ApiError({
        code: 400,
        message: 'Unable to add income',
        explanation: 'Something went wrong while adding the income',
      });
    }

    res.status(200).send({ message: 'Income added' });
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

    const incomes = await IncomesService.getIncomesByUserId(account._id);
    res.status(200).send(incomes);
  }

  static async deleteIncome(req: Request, res: Response): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      throw new ApiError({
        code: 401,
        message: 'Unauthorized',
        explanation: 'You must be logged in to delete an income',
      });
    }

    const { id } = req.params;
    if (!id) {
      throw new ApiError({
        code: 400,
        message: 'Missing income id',
        explanation: 'You must provide an income id to delete',
      });
    }

    const result = await IncomesService.deleteIncomeById(account._id, id);
    if (!result) {
      throw new ApiError({
        code: 400,
        message: 'Unable to delete income',
        explanation: 'Something went wrong while deleting the income',
      });
    }

    res.status(200).send({ message: 'Income deleted' });
  }

  static async getIncomeCategoryNames(
    req: Request,
    res: Response,
  ): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      throw new ApiError({
        code: 401,
        message: 'Unauthorized',
        explanation: 'You must be logged in to get all income categories',
      });
    }

    const categories = await IncomesService.getIncomeCategoryNames();
    res.status(200).send(categories);
  }
}

export default IncomesController;
