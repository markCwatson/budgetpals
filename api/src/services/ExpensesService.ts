import { ObjectId } from 'mongodb';
import ExpensesRepository, {
  ExpensesModel,
} from '../repositories/ExpensesRespository';
import ExpenseCategoryService from './categories/ExpenseCategoryService';

export type Expense = ExpensesModel;

class ExpensesService {
  static async addExpenseByUserId(
    userId: ObjectId,
    expense: ExpensesModel,
  ): Promise<Boolean> {
    return ExpensesRepository.addExpenseByUserId(userId, expense);
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

  static async getExpenseCategoryNames(): Promise<string[] | null> {
    const categories = new ExpenseCategoryService();
    return categories.getExpenseCategoryNames();
  }
}

export default ExpensesService;
