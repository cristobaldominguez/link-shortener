import i18next from 'i18next'
import pool from '../pool.js'

// ErrorHandling
import AuthError from '../../errors/auth_error.js'

// User Creation
async function createUser ({ email, password }) {
  const query = {
    text: 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    values: [email, password]
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]
  } catch (e) {
    // Error for already existing user
    if (e.code === '23505') { throw new AuthError({ message: i18next.t('errors.email_exists') }) }
    return e
  }
}

async function getUserBy (obj) {
  // Maps every key/value into array of strings and then into string
  const queryStr = Object.entries(obj).map(arr => `${arr[0]} = '${arr[1]}'`).join(', ')

  const query = {
    text: `SELECT * FROM users WHERE ${queryStr} AND active = true `
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]
  } catch (e) {
    console.error(e)
    return e
  }
}

async function getUsers () {
  const query = {
    text: 'SELECT * FROM users WHERE active = true order by id',
    values: []
  }

  try {
    const result = await pool.query(query)
    return result.rows
  } catch (e) {
    console.error(e)
    return e
  }
}

export {
  createUser,
  getUserBy,
  getUsers
}
