import { ObjectId } from 'mongodb';

import BudgetsRepository from '../repositories/BudgetsRepository';

class BudgetsService {
  static async addExpenseToBudgetByUserId(
    userId: ObjectId,
    expenseId: ObjectId,
  ): Promise<boolean> {
    return BudgetsRepository.addItemToBudgetByUserId(
      userId,
      expenseId,
      'expense',
    );
  }

  static async addIncomeToBudgetByUserId(
    userId: ObjectId,
    expenseId: ObjectId,
  ): Promise<boolean> {
    return BudgetsRepository.addItemToBudgetByUserId(
      userId,
      expenseId,
      'income',
    );
  }

  // \todo: implement for getting all budgets in DB
  static async getAllBudgets() {
    return [];
  }
}

export default BudgetsService;
