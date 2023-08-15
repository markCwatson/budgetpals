import { Request, Response } from 'express';

import IncomesService from '../services/IncomesService';
import ApiError from '../errors/ApiError';

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

    const incomesService = new IncomesService(account);
    if (!incomesService.addIncome(req.body)) {
      throw new ApiError({
        code: 400,
        message: 'Unable to add income',
        explanation: 'Something went wrong while adding the income',
      });
    }
    res.status(200).send({ message: 'Income added' });
  }
}

export default IncomesController;
