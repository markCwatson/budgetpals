import UsersService, { User } from '../services/UsersService';

class UsersController {
  static async createUser(req, res): Promise<void> {
    const user = await UsersService.create(req.body);
    res.status(200).send({ user });
  }
}

export default UsersController;
