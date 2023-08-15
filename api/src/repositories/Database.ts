import { MongoClient, Db } from 'mongodb';
import { config } from '../settings';

interface DatabaseConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  NAME: string;
}

interface DatabaseConnection {
  client: MongoClient;
  db: Db;
}

const connectToDatabase = async (): Promise<DatabaseConnection> => {
  const { HOST, USER, PASSWORD, NAME } = config.DATABASE as DatabaseConfig;

  const url = `mongodb://${USER}:${PASSWORD}@${HOST}:27017`;
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log(`Connected to database at url '${url}'`);
    return { client, db: client.db(NAME) };
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }

  return { client, db: client.db(NAME) };
};

export default {
  instance: null as DatabaseConnection | null,
  async getInstance(): Promise<DatabaseConnection> {
    if (this.instance === null) {
      this.instance = await connectToDatabase();
    }
    return this.instance;
  },
};
