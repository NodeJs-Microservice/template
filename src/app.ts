import dotenv from 'dotenv';

dotenv.config();

import logger from './utils/logger';
import database from './database';
import config from 'config';
import app from './server';

void database().then();

app.on('error', (error) => {
  logger.error(`application error: ${error.message}`);
  throw error;
});

app.listen(config.get('port'), () => {
  logger.info(`server listening on port : ${config.get('port')} `);
});
