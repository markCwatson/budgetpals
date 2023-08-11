import { MongoClient } from 'mongodb';
import { config } from '../settings';

const connectToDatabase = async () => {
  const { HOST, USER, PASSWORD, NAME } = config.DATABASE;

  const url = `mongodb://${USER}:${PASSWORD}@${HOST}:27017`;
  const client = new MongoClient(url);

  try {
    console.log(`Connecting to database at url '${url}'`);
    await client.connect();
    console.log(`Connected to database at url '${url}'`);
    return { client, db: client.db(NAME) };
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }

  return { client, db: client.db(NAME) };
};

export default {
  instance: null,
  async getSingleton() {
    if (this.instance === null) {
      this.instance = await connectToDatabase();
    }
    return this.instance;
  },
};
