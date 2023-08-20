import { ObjectId } from 'mongodb';
import ApiError from '../errors/ApiError';
import Database from './Database';

export interface Budget {
  userId: ObjectId;
  incomes?: ObjectId[];
  expenses?: ObjectId[];
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
}

export default BudgetsRepository;
