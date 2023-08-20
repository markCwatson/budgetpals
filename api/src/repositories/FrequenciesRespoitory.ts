import ApiError from '../errors/ApiError';
import Database from './Database';

export default class FrequenciesRespoitory {
  static async getFrequencyNames(): Promise<string[] | null> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db.collection('frequencies').distinct('name') as Promise<
        string[]
      >;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async isValidFrequency(frequency: string): Promise<boolean> {
    const mongo = await Database.getInstance();
    try {
      const result = await mongo.db
        .collection('frequencies')
        .findOne({ name: frequency });
      return !!result;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }
}
