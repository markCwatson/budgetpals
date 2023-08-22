import { ObjectId } from 'mongodb';

import BudgetsRepository, { Budget } from '../repositories/BudgetsRepository';

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

  static async getAllBudgets(): Promise<Budget[]> {
    return BudgetsRepository.getAllBudgets();
  }
}

export default BudgetsService;
