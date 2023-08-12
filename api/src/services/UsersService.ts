import UsersRepository, { UserModel } from '../repositories/UsersRepository';
import AuthService from './AuthService';

interface CreateUserInput {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export type User = UserModel;

class UsersService {
  constructor() {}

  async create(body: CreateUserInput): Promise<any> {
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

  async selectByEmail(email: string): Promise<User | null> {
    const usersRepo = new UsersRepository();
    return usersRepo.selectByEmail(email);
  }

  static async selectById(id: string): Promise<User | null> {
    const usersRepo = new UsersRepository();
    return usersRepo.selectById(id);
  }
}

export default UsersService;
