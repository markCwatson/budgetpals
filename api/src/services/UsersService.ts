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
  static async create(body: CreateUserInput): Promise<any> {
    const { password, email, firstName, lastName } = body;
    const hashedPassword = await AuthService.geHashedPassword(password);
    return UsersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  }

  static async selectByEmail(email: string): Promise<User | null> {
    return UsersRepository.selectByEmail(email);
  }

  static async selectById(id: string): Promise<User | null> {
    return UsersRepository.selectById(id);
  }
}

export default UsersService;
