import mongoose from 'mongoose';
import config from 'config';
import logger from './../utils/logger';

export default async () => {
  try {
    const database = await mongoose.connect(config.get('mongodb_config'));
    logger.info('Database Connected');
    return database;
  } catch (err: any) {
    logger.error(`Error Connecting database: ${err.message}`);
    throw err;
  }
};
