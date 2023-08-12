import bcrypt from 'bcrypt';

import UsersService from '../services/UsersService';

class AuthService {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  async getToken(): Promise<string | null> {
    const usersService = new UsersService();
    const user = await usersService.selectByEmail(this.email);
    if (!user) {
      return null;
    }
    const isCorrectPassword = await AuthService.isCorrectPassword(
      this.password,
      user.password,
    );
    if (!isCorrectPassword) {
      return null;
    }
    return 'token';
  }

  static async geHashedPassword(textPassword: string): Promise<string> {
    return bcrypt.hash(textPassword, 10);
  }

  static async isCorrectPassword(textPassword, hash): Promise<boolean> {
    return bcrypt.compare(textPassword, hash);
  }
}

export default AuthService;
