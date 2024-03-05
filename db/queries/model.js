import pool from '../pool.js'

/* Examples */
/*
async function getTodos() {
  const client = await pool.connect()
  const query = {
    text: `SELECT * FROM todos WHERE active = true order by id`,
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
