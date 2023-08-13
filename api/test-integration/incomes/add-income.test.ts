import { describe, expect, it, xit } from '@jest/globals';

// \todo skipping because the POST /incomes route is behind auth. Need to get test database setup first.
describe.skip('POST /incomes', () => {
  it('should return an error for missing amount', async () => {
    const response = await global.request.post('/api/incomes').send({
      description: "Mom's pay",
      frequency: 'bi-weekly',
      isEnding: false,
      endDate: '',
      isFixed: true,
    });

    expect(response.status).toEqual(400);
  });

  it('should return an error for missing frequency', async () => {
    const response = await global.request.post('/api/incomes').send({
      amount: 4200,
      description: "Mom's pay",
      isEnding: false,
      endDate: '',
      isFixed: true,
    });

    expect(response.status).toEqual(400);
  });

  it('should return error due to empty frequency string', async () => {
    const response = await global.request.post('/api/incomes').send({
      amount: 4200,
      description: "Mom's pay",
      frequency: '',
      isEnding: false,
      endDate: '',
      isFixed: true,
    });

    expect(response.status).toEqual(400);
  });

  it('should successfully add income', async () => {
    const response = await global.request.post('/api/incomes').send({
      amount: 4200,
      description: "Mom's pay",
      frequency: 'bi-weekly',
      isEnding: false,
      endDate: '',
      isFixed: true,
    });

    expect(response.status).toEqual(200);
  });
});
