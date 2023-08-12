import UsersService from '../services/UsersService';

class UsersController {
  static async createUser(req, res): Promise<void> {
    const userService = new UsersService();
    const user = await userService.create(req.body);
    res.status(200).send({ user });
  }
}

export default UsersController;
