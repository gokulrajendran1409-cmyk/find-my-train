const { Pool } = require('pg');

const databaseUrl = process.env.DATABASE_URL || '';

const isLocalDatabase =
  databaseUrl.includes('localhost') ||
  databaseUrl.includes('127.0.0.1');

const pool = new Pool({
  connectionString: databaseUrl,

  // Local PostgreSQL: no SSL
  // Render/external PostgreSQL: TLS required
  ssl: isLocalDatabase
    ? false
    : { rejectUnauthorized: false },
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
    await pool.query(`
  WITH duplicates AS (
    SELECT
      id,
      ROW_NUMBER() OVER (
        PARTITION BY train_number, push_token
        ORDER BY id
      ) AS row_num
    FROM tracked_trains
    WHERE active = TRUE
  )
  UPDATE tracked_trains
  SET active = FALSE
  WHERE id IN (
    SELECT id
    FROM duplicates
    WHERE row_num > 1
  );
`);

console.log('Duplicate tracking records cleaned');

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

initializeDatabase();

module.exports = pool;