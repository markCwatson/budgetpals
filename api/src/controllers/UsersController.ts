import ApiError from '../errors/ApiError';
import UsersService from '../services/UsersService';
import AuthService from '../services/AuthService';
import { ActionFunction } from '../routes/routeHandler';

class UsersController {
  static createUser: ActionFunction = async (req, res, next) => {
    const user = await UsersService.create(req.body);
    res.status(201).send({ user });
  };

  static getUsers: ActionFunction = async (req, res, next) => {
    AuthService.getAccountFromLocals(res.locals);

    const users = await UsersService.getUsers();
    res.status(200).send(users);
  };

  static getCurrentUser: ActionFunction = async (req, res, next) => {
    const account = AuthService.getAccountFromLocals(res.locals);

    const user = await UsersService.getUserById(account._id);
    res.status(200).send(user);
  };

  static deleteUser: ActionFunction = async (req, res, next) => {
    const account = AuthService.getAccountFromLocals(res.locals);

    if (!UsersService.delete(account._id)) {
      throw new ApiError({
        code: 400,
        message: 'Unable to delete account',
      });
    }

    res.status(200).send({ message: 'Account deleted' });
  };
}

export default UsersController;
