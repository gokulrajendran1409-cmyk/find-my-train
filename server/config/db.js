const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tracked_trains (
        id SERIAL PRIMARY KEY,
        train_number VARCHAR(20) NOT NULL,
        start_station_code VARCHAR(20) NOT NULL,
        start_station_name VARCHAR(255),
        push_token TEXT NOT NULL,
        last_station_code VARCHAR(20),
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

initializeDatabase();

module.exports = pool;