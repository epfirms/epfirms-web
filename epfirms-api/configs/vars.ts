require('dotenv').config();

module.exports = {
  ENV: process.env.NODE_ENV,
  SERVER_HOST: process.env.SERVER_HOST,
  SERVER_PORT: process.env.SERVER_PORT,
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  STRIPE_SECRET: process.env.STRIPE_SECRET,
  STRIPE_PLAN: process.env.STRIPE_PLAN,
  EMAIL_API_KEY: process.env.EMAIL_API_KEY,
  EMAIL_DOMAIN: process.env.EMAIL_DOMAIN,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET: process.env.AWS_BUCKET,
  CLIENT_URL: process.env.CLIENT_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT
};
