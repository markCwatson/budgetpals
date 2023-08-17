import { describe, expect, it } from '@jest/globals';

// \todo skipping because the PUT /users/incomes route is behind auth. Need to get test database setup first.
describe.skip('POST /incomes', () => {
  it('should return an error for missing amount', async () => {
    const response = await global.request.put('/api/users/incomes').send({
      description: "Mom's pay",
      frequencyId: '12345',
      isEnding: false,
      endDate: new Date(),
      isFixed: true,
    });

    expect(response.status).toEqual(400);
  });

  it('should return an error for missing frequencyId', async () => {
    const response = await global.request.put('/api/users/incomes').send({
      amount: 4200,
      description: "Mom's pay",
      isEnding: false,
      endDate: new Date(),
      isFixed: true,
    });

    expect(response.status).toEqual(400);
  });

  it('should return error due to empty frequency string', async () => {
    const response = await global.request.put('/api/users/incomes').send({
      amount: 4200,
      description: "Mom's pay",
      frequencyId: '',
      isEnding: false,
      endDate: new Date(),
      isFixed: true,
    });

    expect(response.status).toEqual(400);
  });

  it('should successfully add income', async () => {
    const response = await global.request.put('/api/users/incomes').send({
      amount: 4200,
      description: "Mom's pay",
      frequencyId: '12345',
      isEnding: false,
      endDate: new Date(),
      isFixed: true,
    });

    expect(response.status).toEqual(200);
  });
});
