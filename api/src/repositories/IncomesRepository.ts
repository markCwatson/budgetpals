import { ObjectId } from 'mongodb';
import Database from './Database';

export interface IncomesModel {
  _id?: ObjectId;
  amount: number;
  frequency: string;
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
      console.error(error);
    }
    return false;
  }
}

export default IncomesRepository;
