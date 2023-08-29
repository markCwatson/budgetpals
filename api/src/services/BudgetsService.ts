import { ObjectId } from 'mongodb';

import BudgetsRepository, { Budget, UserBudget } from '../repositories/BudgetsRepository';
import ExpensesService from './ExpensesService';
import IncomesService from './IncomesService';

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

  static async getMyPlannedBudget(userId: ObjectId): Promise<UserBudget> {
    const expenses = await ExpensesService.getExpensesByUserId(userId, { isPlanned: true });
    const incomes = await IncomesService.getIncomesByUserId(userId, { isPlanned: true });
    return {
      plannedExpenses: expenses || [],
      plannedIncomes: incomes || [],
    };
  }
}

export default BudgetsService;
