import { ObjectId } from 'mongodb';
import Database from './Database';
import ApiError from '../errors/ApiError';

export interface ExpensesModel {
  _id: ObjectId;
  userId: ObjectId;
  amount: number;
  categoryId: string;
  frequencyId: string;
  isEnding: boolean;
  endDate: Date;
  isFixed: boolean;
}

class ExpensesRepository {
  static async addExpenseByUserId(
    userId: ObjectId,
    model: ExpensesModel,
  ): Promise<Boolean> {
    const mongo = await Database.getInstance();
    const expense = {
      ...model,
      userId,
    };
    try {
      const { insertedId } = await mongo.db.collection('expenses').insertOne({
        ...expense,
      });
      return (
        ExpensesRepository.getExpenseById(insertedId.toHexString()) !== null
      );
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async getExpensesByUserId(userId: ObjectId): Promise<ExpensesModel[]> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db
        .collection('expenses')
        .find({ userId })
        .toArray() as Promise<ExpensesModel[]>;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async deleteExpenseById(
    userId: ObjectId,
    expenseId: string,
  ): Promise<Boolean> {
    const mongo = await Database.getInstance();
    try {
      const { deletedCount } = await mongo.db.collection('expenses').deleteOne({
        userId,
        _id: new ObjectId(expenseId),
      });
      return deletedCount === 1;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async getExpenseById(incomeId: string): Promise<ExpensesModel | null> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db.collection('expenses').findOne({
        _id: new ObjectId(incomeId),
      }) as Promise<ExpensesModel>;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async getExpensesCategories(): Promise<string[] | null> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db
        .collection('expense-categories')
        .distinct('name') as Promise<string[]>;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }
}

export default ExpensesRepository;
