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

    const isValidFrequency = await FrequencyService.isValidFrequency(
      expense.frequency,
    );
    if (!isValidFrequency) return false;

    // convert dates to Date objects in DB
    const expenseToAdd = ExpensesService.convertDates(expense);

    const expenseId = await ExpensesRepository.addExpenseByUserId(
      userId,
      expenseToAdd,
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

  private static convertDates(expense: ExpensesModel) {
    let expenseToAdd = {
      ...expense,
      date: new Date(expense.date),
    };

    if (expense.isEnding === false) {
      delete expenseToAdd.endDate;
    } else {
      expenseToAdd = {
        ...expenseToAdd,
        endDate: new Date(expense.endDate),
      };
    }
    
    return expenseToAdd;
  }
}

export default ExpensesService;
