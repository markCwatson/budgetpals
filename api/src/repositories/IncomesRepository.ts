import { ObjectId } from 'mongodb';
import Database from './Database';
import ApiError from '../errors/ApiError';

export interface IncomesModel {
  _id: ObjectId;
  userId: ObjectId;
  amount: number;
  date: Date;
  category: string;
  frequency: string;
  isEnding: boolean;
  endDate: Date;
  isFixed: boolean;
}

class IncomesRepository {
  static async addIncomeByUserId(
    userId: ObjectId,
    model: IncomesModel,
  ): Promise<ObjectId> {
    const mongo = await Database.getInstance();
    const income = {
      ...model,
      userId,
    };
    try {
      const { insertedId } = await mongo.db.collection('incomes').insertOne({
        ...income,
      });
      return insertedId;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async getIncomesByUserId(
    userId: ObjectId,
  ): Promise<IncomesModel[] | null> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db
        .collection('incomes')
        .find({ userId })
        .toArray() as Promise<IncomesModel[]>;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async deleteIncomeById(
    userId: ObjectId,
    incomeId: string,
  ): Promise<Boolean> {
    const mongo = await Database.getInstance();
    try {
      const result = await mongo.db.collection('incomes').deleteOne({
        userId,
        _id: new ObjectId(incomeId),
      });
      return result.deletedCount === 1;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async getIncomeById(incomeId: string): Promise<IncomesModel | null> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db.collection('incomes').findOne({
        _id: new ObjectId(incomeId),
      }) as Promise<IncomesModel>;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }
}

export default IncomesRepository;
