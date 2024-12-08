import env from "dotenv";
env.config();

export const envService = {
  PORT: process.env.PORT || 8181,
  ENVIRONMENT: process.env.ENVIRONMENT,
  MONGO_LOCAL_URI: process.env.MONGO_LOCAL_URI,
  MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  MAIL_PROVIDER: process.env.MAIL_PROVIDER,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_VERIFY_KEY: process.env.MAIL_VERIFY_KEY,
  BASE_URL: process.env.BASE_URL,
  ONLINE_BASE_URL: process.env.ONLINE_BASE_URL,
  API_VERSION: process.env.API_VERSION,
};
