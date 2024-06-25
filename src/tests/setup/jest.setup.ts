import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const globalSetup = async () => {
  const mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = `${mongoServer.getUri().replace(/\/+$/, '')}/test`;

  (global as any).__MONGOOD__ = mongoServer;

  const conn = await mongoose.connect(process.env.MONGO_URI);
  await conn.connection.db.dropDatabase();
  await mongoose.disconnect();
};

export default globalSetup;
