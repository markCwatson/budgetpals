import { describe, expect, it, xit } from '@jest/globals';

describe('POST /incomes', () => {
  it('should return an error for missing amount', async () => {
    const response = await global.request.post('/api/incomes').send({
      frequency: 'weekly',
    });

    expect(response.status).toEqual(400);
  });

  it('should return an error for missing frequency', async () => {
    const response = await global.request.post('/api/incomes').send({
      amount: 1500,
    });

    expect(response.status).toEqual(400);
  });

  it('should return error due to empty frequency string', async () => {
    const response = await global.request.post('/api/incomes').send({
      amount: 1500,
      frequency: '',
    });

    expect(response.status).toEqual(400);
  });

  it('should return income', async () => {
    const response = await global.request.post('/api/incomes').send({
      amount: 1500,
      frequency: 'weekly',
    });

    expect(response.status).toEqual(200);
  });
});
