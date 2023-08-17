import { ObjectId } from 'mongodb';
import Database from './Database';
import ApiError from '../errors/ApiError';

export interface UserModel {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class UsersRepository {
  static async create(model: UserModel): Promise<UserModel | null> {
    const mongo = await Database.getInstance();
    try {
      const { insertedId } = await mongo.db
        .collection('users')
        .insertOne(model);
      return mongo.db
        .collection('users')
        .findOne({ _id: insertedId }) as Promise<UserModel>;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async getUsers(): Promise<UserModel[]> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db.collection('users').find({}).toArray() as Promise<
        UserModel[]
      >;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async delete(userId: ObjectId): Promise<Boolean> {
    const mongo = await Database.getInstance();
    try {
      const result = await mongo.db
        .collection('users')
        .deleteOne({ _id: userId });
      return result.deletedCount === 1;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async selectByEmail(email: string): Promise<UserModel | null> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db
        .collection('users')
        .findOne({ email }) as Promise<UserModel>;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async selectById(userId: ObjectId): Promise<UserModel | null> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db
        .collection('users')
        .findOne({ _id: userId }) as Promise<UserModel>;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }
}

export default UsersRepository;
