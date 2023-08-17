import { Request, Response } from 'express';

import ApiError from '../errors/ApiError';
import UsersService from '../services/UsersService';

class UsersController {
  static async createUser(req, res): Promise<void> {
    const user = await UsersService.create(req.body);
    res.status(200).send({ user });
  }

  static async getUsers(req: Request, res: Response): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      throw new ApiError({
        code: 401,
        message: 'Unauthorized',
        explanation: 'You must be logged in to get all users',
      });
    }

    const users = await UsersService.getUsers();
    res.status(200).send(users);
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const account = res.locals['user'];
    if (!account) {
      throw new ApiError({
        code: 401,
        message: 'Unauthorized',
        explanation: 'You must be logged in to delete account',
      });
    }

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
