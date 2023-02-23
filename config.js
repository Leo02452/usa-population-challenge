const dotenv = require('dotenv');
dotenv.config();

require('dotenv-safe').config({
  allowEmptyValues: true,
  example: './.env'
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_SCHEMA: process.env.DATABASE_SCHEMA || 'public', 
  DATABASE_URL: process.env.DATABASE_URL || '',
  SHOW_PG_MONITOR: process.env.SHOW_PG_MONITOR || 'false',
}

const keys = Object.keys(module.exports).sort()
for (const name of keys) {
  console.log(`${name} [${module.exports[name]}]`);
}
console.log();
