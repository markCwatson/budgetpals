import { ObjectId } from 'mongodb';
import ExpensesRepository, {
  ExpensesModel,
} from '../repositories/ExpensesRespository';
import ExpenseCategoryService from './categories/ExpenseCategoryService';
import BudgetsService from './BudgetsService';
import FrequencyService from './FrequencyService';

export type Expense = ExpensesModel;

class ExpensesService {
  static async addExpenseByUserId(
    userId: ObjectId,
    expense: ExpensesModel,
  ): Promise<Boolean> {
    const category = new ExpenseCategoryService();
    const isValidCategory = await category.isValidCategory(expense.category);
    if (!isValidCategory) return false;

    // \todo: validate frequency

    const expenseId = await ExpensesRepository.addExpenseByUserId(
      userId,
      expense,
    );

    return BudgetsService.addExpenseToBudgetByUserId(userId, expenseId);
  }

  static async getExpensesByUserId(
    userId: ObjectId,
  ): Promise<ExpensesModel[] | null> {
    return ExpensesRepository.getExpensesByUserId(userId);
  }

  static async deleteExpenseById(
    userId: ObjectId,
    expenseId: string,
  ): Promise<Boolean> {
    const { userId: user } = await ExpensesRepository.getExpenseById(expenseId);
    if (!user) return false;
    if (!user.equals(userId)) return false;
    return ExpensesRepository.deleteExpenseById(userId, expenseId);
  }

  static async getCategoryNames(): Promise<string[] | null> {
    const categories = new ExpenseCategoryService();
    return categories.getCategoryNames();
  }

  static async getFrequencyNames(): Promise<string[] | null> {
    return FrequencyService.getFrequencyNames();
  }
}

export default ExpensesService;
