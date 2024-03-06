import pool from '../pool.js'

async function resetDb () {
  try {
    // Drop Tables
    await pool.query(`
      DROP TABLE IF EXISTS registers;
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

    // Adds Registers Table
    await pool.query(`
      CREATE TABLE registers(
        id SERIAL,

        slug VARCHAR(30) NOT NULL UNIQUE,
        url VARCHAR(255) NOT NULL,
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
  }
}

export default {
  resetDb
}
