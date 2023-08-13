import { describe, expect, it } from '@jest/globals';
import { ObjectId } from 'mongodb';

import IncomesService from '../../src/services/IncomesService';

import IncomesRepository from '../../src/repositories/IncomesRepository';

describe('IncomesService', () => {
  it('should add incomes to user', async () => {
    // This test is pointless right now because it's just testing that the mock works
    // but it's here in case the addIncome method changes in future

    const income = {
      amount: 4200,
      description: "Mom's pay",
      frequency: 'bi-weekly',
      isEnding: false,
      endDate: '',
      isFixed: true,
    };

    IncomesRepository.addIncomeByUserId = jest.fn().mockResolvedValue(true);

    const incomesService = new IncomesService({
      _id: new ObjectId('123456123456123456123456'),
      firstName: 'Test',
      lastName: 'User',
      email: 'test-user@email.com',
      password: 'password',
    });

    const result = await incomesService.addIncome(income);
    expect(result).toEqual(true);
  });
});
