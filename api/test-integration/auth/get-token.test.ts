import { describe, expect, it, xit } from '@jest/globals';

describe('POST /auth/token', () => {
  // \todo: hw do get database setup during tests?
  xit('should return token', async () => {
    await global.request.post('/api/users').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      password: '12345678',
    });

    const response = await global.request.post('/api/auth/token').send({
      email: 'john@email.com',
      password: '12345678',
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });

  it('should return an error for missing password', async () => {
    const response = await global.request.post('/api/auth/token').send({
      username: 'get-token@test.com',
    });

    expect(response.status).toEqual(400);
  });

  it('should return an error for missing username', async () => {
    const response = await global.request.post('/api/auth/token').send({
      password: 'secret',
    });

    expect(response.status).toEqual(400);
  });
});
