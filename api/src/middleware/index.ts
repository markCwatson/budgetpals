import { Request, Response, NextFunction } from 'express';

export default (action) => {
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await action(req, res, next);
    } catch (err) {
      next(err);
      return;
    }
  };
};
