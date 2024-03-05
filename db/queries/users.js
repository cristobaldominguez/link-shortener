import i18next from 'i18next'
import pool from '../pool.js'

// ErrorHandling
import AuthError from '../../errors/auth_error.js'

// User Creation
async function createUser ({ email, password }) {
  const client = await pool.connect()
  const query = {
    text: 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    values: [email, password]
  }

  try {
    const result = await client.query(query)
    return result.rows[0]
  } catch (e) {
    // Error for already existing user
    if (e.code === '23505') { throw new AuthError({ message: i18next.t('errors.email_exists') }) }
    return e
  } finally {
    client.release()
  }
}

async function getUserBy (obj) {
  // Maps every key/value into array of strings and then into string
  const queryStr = Object.entries(obj).map(arr => `${arr[0]} = '${arr[1]}'`).join(', ')

  const client = await pool.connect()
  const query = {
    text: `SELECT * FROM users WHERE ${queryStr} AND active = true `
  }

  try {
    const result = await client.query(query)
    return result.rows[0]
  } catch (e) {
    console.error(e)
    return e
  } finally {
    client.release()
  }
}

async function getUsers () {
  const client = await pool.connect()
  const query = {
    text: 'SELECT * FROM users WHERE active = true order by id',
    values: []
  }

  try {
    const result = await client.query(query)
    return result.rows
  } catch (e) {
    console.error(e)
    return e
  } finally {
    client.release()
  }
}

export {
  createUser,
  getUserBy,
  getUsers
}
