import { ObjectId } from 'mongodb';
import ExpensesRepository, {
  ExpensesModel,
} from '../repositories/ExpensesRespository';
import ExpenseCategoryService from './categories/ExpenseCategoryService';
import FrequencyService from './FrequencyService';
import BudgetsService from './BudgetsService';

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

    const result = await ExpensesRepository.addExpenseByUserId(
      userId,
      expenseToAdd,
    );
    if (!result) return false;

    if (!expenseToAdd.isPlanned) {
      // not a planned expense means it's expense that has already happened
      await BudgetsService.modifyRunningAccountBalance(
        userId,
        'expense',
        expenseToAdd.amount,
      );
    }

    return result;
  }

  static async getExpensesByUserId(
    userId: ObjectId,
    filter?: Partial<ExpensesModel>,
  ): Promise<ExpensesModel[] | null> {
    return ExpensesRepository.getExpensesByUserId(userId, filter);
  }

  static async deleteExpenseById(
    userId: ObjectId,
    expenseId: string,
  ): Promise<Boolean> {
    const expense = await ExpensesRepository.getExpenseById(expenseId);
    if (!expense.userId) return false;
    if (!expense.userId.equals(userId)) return false;

    const result = ExpensesRepository.deleteExpenseById(userId, expenseId);
    if (!result) return false;

    if (!expense.isPlanned) {
      await BudgetsService.modifyRunningAccountBalance(
        userId,
        'expense',
        -expense.amount,
      );
    }

    return result;
  }

  static async getCategoryNames(): Promise<string[] | null> {
    const categories = new ExpenseCategoryService();
    return categories.getCategoryNames();
  }

  static async getFrequencyNames(): Promise<string[] | null> {
    return FrequencyService.getFrequencyNames();
  }

  private static convertDates(expense: ExpensesModel): ExpensesModel {
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
