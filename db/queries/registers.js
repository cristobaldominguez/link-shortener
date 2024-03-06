import i18next from 'i18next'
import ContentError from '../../errors/content_error.js'
import pool from '../pool.js'

async function getRegisters () {
  const client = await pool.connect()
  const query = {
    text: 'SELECT id, slug, url, user_id, created_at FROM registers WHERE active = true order by id',
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

async function createRegister ({ slug, url, userId }) {
  const client = await pool.connect()
  const query = {
    text: 'INSERT INTO registers (slug, url, user_id) VALUES ($1, $2, $3) RETURNING id, slug, url, user_id, created_at',
    values: [slug, url, userId]
  }

  try {
    const result = await client.query(query)
    return result.rows[0]
  } catch (e) {
    if (e.code === '23505') throw new ContentError({ message: i18next.t('errors.registers_slug_key', { slug }) })

    console.error(e)
    return e
  } finally {
    client.release()
  }
}

async function getRegisterBy (obj) {
  const queryStr = Object.entries(obj).map(arr => `${arr[0]} = '${arr[1]}'`).join(', ')

  const client = await pool.connect()
  const query = {
    text: `SELECT id, slug, url, user_id FROM registers WHERE ${queryStr} AND active = true `
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

export {
  getRegisters,
  getRegisterBy,
  createRegister
}

/* Examples */
/*
async function getTodo(id) {
  const client = await pool.connect()
  const query = {
    text: `SELECT * FROM todos WHERE id = $1 AND active = true `,
    values: [id]
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

async function newTodo(content, done = false) {
  const client = await pool.connect()
  const query = {
    text: `INSERT INTO todos (content, done) VALUES ($1, $2) RETURNING *`,
    values: [content, done]
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

async function updateTodo(id, content, done = false) {
  const client = await pool.connect()
  const query = {
    text: `UPDATE todos SET content = $1, done = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
    values: [content, done, id]
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

async function deleteTodo(id) {
  const client = await pool.connect()
  const query = {
    text: `UPDATE todos SET active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
    values: [id]
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

export {
  getTodo,
  getTodos,
  newTodo,
  updateTodo,
  deleteTodo
}
*/
