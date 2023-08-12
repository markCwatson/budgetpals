import Database from './Database';
import { ObjectId } from 'mongodb';

interface UserModel {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class UsersRepository {
  constructor() {}

  async create(model: UserModel): Promise<UserModel | null> {
    const mongo = await Database.getInstance();
    try {
      const { insertedId } = await mongo.db
        .collection('users')
        .insertOne(model);
      return mongo.db
        .collection('users')
        .findOne({ _id: insertedId }) as Promise<UserModel>;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async selectByEmail(email: string): Promise<UserModel | null> {
    const mongo = await Database.getInstance();
    try {
      return mongo.db
        .collection('users')
        .findOne({ email }) as Promise<UserModel>;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}

export default UsersRepository;
