import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  DB_HOSTNAME: process.env.DB_HOSTNAME,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  TYPEORM_SYNC: process.env.TYPEORM_SYNC,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_PROCESS,
};
