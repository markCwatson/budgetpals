import UsersRepository from '../repositories/UsersRepository';

import AuthService from './AuthService';

class UsersService {
  constructor() {}

  async create(body): Promise<any> {
    const { password, email, firstName, lastName } = body;
    const hashedPassword = await AuthService.geHashedPassword(password);
    const usersRepo = new UsersRepository();
    return usersRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  }

  async selectByEmail(email): Promise<any> {
    const usersRepo = new UsersRepository();
    return usersRepo.selectByEmail(email);
  }
}

export default UsersService;
