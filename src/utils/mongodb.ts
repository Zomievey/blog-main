import { MongoClient, Db } from 'mongodb';

const MONGODB_URI: string = process.env.MONGODB_URI || '';
const MONGODB_DB: string = process.env.MONGODB_DB || '';

if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!MONGODB_DB) {
  throw new Error('Please add your Mongo DB to .env.local');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient, db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI);

  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
