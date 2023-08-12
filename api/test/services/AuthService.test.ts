import { describe, expect, it } from '@jest/globals';
import AuthService from '../../src/services/AuthService';
import UsersService from '../../src/services/UsersService';

describe('AuthService', () => {
  it('should return `token`', async () => {
    UsersService.prototype.selectByEmail = jest.fn().mockResolvedValue({
      password: 'password',
    });
    AuthService.isCorrectPassword = jest.fn().mockResolvedValue(true);
    const auth = new AuthService('email', 'password');
    const result = await auth.getToken();
    expect(result).toEqual('token');
  });
});
