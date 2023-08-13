import { ObjectId } from 'mongodb';
import Database from './Database';

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
      console.error(error);
    }
    return null;
  }

  static async selectByEmail(email: string): Promise<UserModel | null> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db
        .collection('users')
        .findOne({ email }) as Promise<UserModel>;
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  static async selectById(id: string): Promise<UserModel | null> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db
        .collection('users')
        .findOne({ _id: new ObjectId(id) }) as Promise<UserModel>;
    } catch (error) {
      console.error(error);
    }
    return null;
  }
}

export default UsersRepository;
