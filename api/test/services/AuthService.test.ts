import { describe, expect, it } from '@jest/globals';
import AuthService from '../../src/services/AuthService';
import UsersService from '../../src/services/UsersService';

jest.mock('../../src/settings/config', () => ({
  ...jest.requireActual('../../src/settings/config'),
  JWT_SECRET_KEY: 'dgsfgdfgdg',
}));

describe('AuthService', () => {
  it('should return a token', async () => {
    UsersService.prototype.selectByEmail = jest.fn().mockResolvedValue({
      _id: 'id',
      password: 'password',
    });
    AuthService.isCorrectPassword = jest.fn().mockResolvedValue(true);

    const result = await AuthService.generateToken('email', 'password');
    expect(result).toEqual(expect.any(String));
  });

  it('should decode a token', async () => {
    UsersService.prototype.selectByEmail = jest.fn().mockResolvedValue({
      _id: 'id',
      password: 'password',
    });
    AuthService.isCorrectPassword = jest.fn().mockResolvedValue(true);

    const result = await AuthService.generateToken('email', 'password');
    expect(result).toEqual(expect.any(String));

    const decoded = AuthService.decodeAndVerifyToken(result);
    expect(decoded).toEqual({
      exp: expect.any(Number),
      iat: expect.any(Number),
      sub: 'id',
    });
  });
});
