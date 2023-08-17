import { ObjectId } from 'mongodb';
import Database from './Database';
import ApiError from '../errors/ApiError';

export interface IncomesModel {
  _id?: ObjectId;
  amount: number;
  description: string;
  frequencyId: string;
  isEnding: boolean;
  endDate: Date;
  isFixed: boolean;
}

class IncomesRepository {
  static async addIncomeByUserId(
    userId: ObjectId,
    model: IncomesModel,
  ): Promise<Boolean> {
    const mongo = await Database.getInstance();
    try {
      const result = await mongo.db.collection('incomes').updateOne(
        { userId },
        {
          $push: {
            incomes: model,
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

  static async getIncomesByUserId(userId: ObjectId): Promise<IncomesModel[]> {
    const mongo = await Database.getInstance();
    try {
      const result = await mongo.db
        .collection('incomes')
        .findOne({ userId }, { projection: { _id: 0, incomes: 1 } });
      return result.incomes;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }
}

export default IncomesRepository;
