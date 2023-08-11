import { describe, expect, it } from '@jest/globals';
import AuthService from '../../src/services/AuthService';

describe('AuthService', () => {
  it('should return `token`', () => {
    const auth = new AuthService('username', 'password');
    const result = auth.getToken();
    expect(result).toEqual('token');
  });
});
