import { NextFunction, Request, Response } from 'express';

import ApiError from '../errors/ApiError';
import UsersService from '../services/UsersService';
import AuthService from '../services/AuthService';

class UsersController {
  static async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = await UsersService.create(req.body);
    res.status(200).send({ user });
  }

  static async getUsers(req: Request, res: Response): Promise<void> {
    AuthService.getAccountFromLocals(res.locals);

    const users = await UsersService.getUsers();
    res.status(200).send(users);
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const account = AuthService.getAccountFromLocals(res.locals);

    if (!UsersService.delete(account._id)) {
      throw new ApiError({
        code: 400,
        message: 'Unable to delete account',
      });
    }

    res.status(200).send({ message: 'Account deleted' });
  }
}

export default UsersController;
