import { describe, expect, it } from '@jest/globals';
import { ObjectId } from 'mongodb';

import ExpensesService from '../../src/services/ExpensesService';
import ExpensesRepository, {
  ExpensesModel,
} from '../../src/repositories/ExpensesRespository';

describe('ExpensesService', () => {
  it('should add expenses to user', async () => {
    // This test is pointless right now because it's just testing that the mock works
    // but it's here in case the addIncomeByUserId method changes in future

    const expense: ExpensesModel = {
      _id: new ObjectId('123456123456123456123456'),
      userId: new ObjectId('023456123456123456123450'),
      amount: 4200,
      categoryId: '3434343434',
      frequencyId: '1212121212',
      isEnding: false,
      endDate: new Date(),
      isFixed: true,
    };

    ExpensesRepository.addExpenseByUserId = jest.fn().mockResolvedValue(true);

    const result = await ExpensesService.addExpenseByUserId(
      new ObjectId('123456123456123456123456'),
      expense,
    );
    expect(result).toEqual(true);
  });

  it('should get expenses for user', async () => {
    // This test is pointless right now because it's just testing that the mock works
    // but it's here in case the getExpensesByUserId method changes in future

    const expense: ExpensesModel = {
      _id: new ObjectId('123456123456123456123456'),
      userId: new ObjectId('023456123456123456123450'),
      amount: 4200,
      categoryId: '3434343434',
      frequencyId: '1212121212',
      isEnding: false,
      endDate: new Date(),
      isFixed: true,
    };

    ExpensesRepository.getExpensesByUserId = jest
      .fn()
      .mockResolvedValue(expense);

    const result = await ExpensesService.getExpensesByUserId(
      new ObjectId('123456123456123456123456'),
    );
    expect(result).toEqual(expense);
  });
});
