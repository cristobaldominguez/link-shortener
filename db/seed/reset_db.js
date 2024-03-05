import pool from '../pool.js'

async function reset_db () {
  try {
    // Drop Tables
    await pool.query(`
      DROP TABLE IF EXISTS urls;
      DROP TABLE IF EXISTS users;
    `)

    // Adds Users Table
    await pool.query(`
      CREATE TABLE users(
        id SERIAL,

        email VARCHAR(75) NOT NULL UNIQUE,
        password VARCHAR(75) NOT NULL,

        active BOOLEAN DEFAULT TRUE,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      
        PRIMARY KEY (id)
      );
    `)

    // Adds URLs Table
    await pool.query(`
      CREATE TABLE urls(
        id SERIAL,

        slug VARCHAR(30) NOT NULL,
        address VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,

        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        active BOOLEAN DEFAULT TRUE,

        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `)
  } catch (e) {
    console.error(e)
    return e
  } finally {

  }
}

export {
  reset_db
}
