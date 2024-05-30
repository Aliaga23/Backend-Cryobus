require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.PORT || 123,
  DB_HOST: process.env.DB_HOST || 'roundhouse.proxy.rlwy.net',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'yNFwyZkVQfjLiHozbASiULcWbeAHcDPS',
  DB_NAME: process.env.DB_NAME || 'railway',
  DB_PORT: process.env.DB_PORT || 47126
};
