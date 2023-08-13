import { Request, Response } from 'express';

import IncomesService from '../services/IncomesService';

class IncomesController {
  static async addIncome(req: Request, res: Response): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }

    const incomesService = new IncomesService(account);
    if (!incomesService.addIncome(req.body)) {
      res.status(400).send({ error: 'Unable to add income' });
      return;
    }
    res.status(200).send({ message: 'Income added' });
  }
}

export default IncomesController;
