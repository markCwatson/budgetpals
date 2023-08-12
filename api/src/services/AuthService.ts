import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UsersService, { User } from '../services/UsersService';
import { config } from '../settings';

class AuthService {
  static async generateToken(
    email: string,
    password: string,
  ): Promise<string | null> {
    const user: User = await UsersService.selectByEmail(email);
    if (!user) return null;

    const isCorrectPassword = await AuthService.isCorrectPassword(
      password,
      user.password,
    );
    if (!isCorrectPassword) return null;

    return jwt.sign(
      {
        email: user.email,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: '24h',
        subject: user._id.toString(),
      },
    );
  }

  static decodeAndVerifyToken(token: string): jwt.types.DecodedJWT {
    try {
      const decoded = jwt.verify(
        token,
        config.JWT_SECRET_KEY,
      ) as jwt.types.DecodedJWT;
      return decoded;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new Error('Authorization token expired');
      }
      throw new Error('Invalid access token');
    }
  }

  static async geHashedPassword(textPassword: string): Promise<string> {
    return bcrypt.hash(textPassword, 10);
  }

  static async isCorrectPassword(
    textPassword: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(textPassword, hash);
  }
}

export default AuthService;
