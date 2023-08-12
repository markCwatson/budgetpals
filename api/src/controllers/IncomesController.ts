import { Request, Response } from 'express';

import IncomesService from '../services/IncomesService';

class IncomesController {
  static async addIncome(req: Request, res: Response): Promise<void> {
    const { amount, frequency } = req.body;
    // \todo use session context
    const incomesService = new IncomesService();
    const income = await incomesService.addIncome(amount, frequency);
    res.status(200).send({ income });
  }
}

export default IncomesController;
