import { RequestHandler, NextFunction, Request, Response } from 'express';

export type ActionFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

const routeHandler =
  (action: ActionFunction): RequestHandler =>
  async (req, res, next) =>
    Promise.resolve(action(req, res, next)).catch(next);

export default routeHandler;
