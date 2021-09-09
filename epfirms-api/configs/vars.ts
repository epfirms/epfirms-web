require('dotenv').config();

module.exports = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    EMAIL_API_KEY: process.env.EMAIL_API_KEY,
    EMAIL_DOMAIN: process.env.EMAIL_DOMAIN,
}