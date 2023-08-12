import { Request, Response } from 'express';

import IncomesService from '../services/IncomesService';

class IncomesController {
  static async addIncome(req: Request, res: Response): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }

    const { amount, frequency } = req.body;
    const incomesService = new IncomesService(account);
    const income = await incomesService.addIncome(amount, frequency);
    res.status(200).send({ income });
  }
}

export default IncomesController;
