import { describe, expect, it } from '@jest/globals';
import { ObjectId } from 'mongodb';

import IncomesService from '../../src/services/IncomesService';

import IncomesRepository, {
  IncomesModel,
} from '../../src/repositories/IncomesRepository';
import IncomeCategoryService from '../../src/services/categories/IncomeCategoryService';
import FrequencyService from '../../src/services/FrequencyService';
import BudgetsService from '../../src/services/BudgetsService';

describe('IncomesService', () => {
  it('should add incomes to user', async () => {
    // This test is pointless right now because it's just testing that the mock works
    // but it's here in case the addIncomeByUserId method changes in future

    const income: IncomesModel = {
      _id: new ObjectId('123456123456123456123456'),
      userId: new ObjectId('023456123456123456123450'),
      amount: 4200,
      date: new Date(),
      category: 'Paycheck',
      frequency: 'weekly',
      isEnding: false,
      endDate: new Date(),
      isFixed: true,
      isPlanned: true,
    };

    IncomesRepository.addIncomeByUserId = jest.fn().mockResolvedValue(true);
    FrequencyService.isValidFrequency = jest.fn().mockResolvedValue(true);
    IncomeCategoryService.prototype.isValidCategory = jest
      .fn()
      .mockResolvedValue(true);
    BudgetsService.modifyRunningAccountBalance = jest
      .fn()
      .mockResolvedValue(true);

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
      _id: new ObjectId('123456123456123456123456'),
      userId: new ObjectId('023456123456123456123450'),
      amount: 4200,
      date: new Date(),
      category: 'Paycheck',
      frequency: 'weekly',
      isEnding: false,
      endDate: new Date(),
      isFixed: true,
      isPlanned: true,
    };

    IncomesRepository.getIncomesByUserId = jest.fn().mockResolvedValue(income);

    const result = await IncomesService.getIncomesByUserId(
      new ObjectId('123456123456123456123456'),
    );
    expect(result).toEqual(income);
  });
});
