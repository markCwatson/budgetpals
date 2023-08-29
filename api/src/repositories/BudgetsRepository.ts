import { ObjectId } from 'mongodb';
import ApiError from '../errors/ApiError';
import Database from './Database';
import { Income } from '../services/IncomesService';
import { Expense } from '../services/ExpensesService';

export interface Budget {
  userId: ObjectId;
  incomes?: ObjectId[];
  expenses?: ObjectId[];
}

export interface UserBudget {
  plannedIncomes: Income[];
  plannedExpenses: Expense[];
}

class BudgetsRepository {
  static async addItemToBudgetByUserId(
    userId: ObjectId,
    transaction: ObjectId,
    key: 'income' | 'expense',
  ) {
    const mongo = await Database.getInstance();
    try {
      const result = await mongo.db
        .collection<Budget>('budgets')
        .findOneAndUpdate(
          {
            userId,
          },
          {
            $push: {
              [`${key}Ids`]: transaction,
            },
          },
          {
            upsert: true,
          },
        );
      return !!result.value;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async getAllBudgets(): Promise<Budget[]> {
    const mongo = await Database.getInstance();
    try {
      const result = await mongo.db.collection<Budget>('budgets').find();
      return result.toArray();
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async getBudgetByUserId(userId: ObjectId): Promise<Budget> {
    const mongo = await Database.getInstance();
    try {
      const result = await mongo.db
        .collection<Budget>('budgets')
        .findOne({ userId });
      return result;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }
}

export default BudgetsRepository;
