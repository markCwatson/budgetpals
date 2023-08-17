import { describe, expect, it } from '@jest/globals';
import { ObjectId } from 'mongodb';

import IncomesService from '../../src/services/IncomesService';

import IncomesRepository, {
  IncomesModel,
} from '../../src/repositories/IncomesRepository';

describe('IncomesService', () => {
  it('should add incomes to user', async () => {
    // This test is pointless right now because it's just testing that the mock works
    // but it's here in case the addIncomeByUserId method changes in future

    const income: IncomesModel = {
      amount: 4200,
      description: "Mom's pay",
      frequencyId: '1212121212',
      isEnding: false,
      endDate: new Date(),
      isFixed: true,
    };

    IncomesRepository.addIncomeByUserId = jest.fn().mockResolvedValue(true);

    const result = await IncomesService.addIncomeByUserId(
      new ObjectId('123456123456123456123456'),
      income,
    );
    expect(result).toEqual(true);
  });

  it('should get incomes for user', async () => {
    // This test is pointless right now because it's just testing that the mock works
    // but it's here in case the getIncomesByUserId method changes in future

    const income: IncomesModel = {
      amount: 4200,
      description: "Mom's pay",
      frequencyId: '1212121212',
      isEnding: false,
      endDate: new Date(),
      isFixed: true,
    };

    IncomesRepository.getIncomesByUserId = jest.fn().mockResolvedValue(income);

    const result = await IncomesService.getIncomesByUserId(
      new ObjectId('123456123456123456123456'),
    );
    expect(result).toEqual(income);
  });
});
