import { ObjectId } from 'mongodb';
import Database from './Database';
import ApiError from '../errors/ApiError';

export interface ExpensesModel {
  _id?: ObjectId;
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
    try {
      const result = await mongo.db.collection('expenses').updateOne(
        { userId },
        {
          $push: {
            expenses: model,
          },
        },
        {
          upsert: true,
        },
      );
      return result.modifiedCount === 1 || result.upsertedCount === 1;
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
      const result = await mongo.db
        .collection('expenses')
        .findOne({ userId }, { projection: { _id: 0, expenses: 1 } });
      return result.expenses;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }
}

export default ExpensesRepository;
