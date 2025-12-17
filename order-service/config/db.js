const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

async function init() {
  const maxAttempts = 30;
  const delayMs = 2000;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(64) NOT NULL,
        product_id VARCHAR(64) NOT NULL,
        size VARCHAR(8) NOT NULL,
        quantity INTEGER NOT NULL,
        total_amount NUMERIC(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );`);
      console.log('Postgres ready, orders table ensured');
      return;
    } catch (err) {
      console.log(`Postgres not ready (attempt ${attempt}/${maxAttempts}): ${err.code || err.message}`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error('Failed to init Postgres after multiple retries');
}

module.exports = { pool, init };