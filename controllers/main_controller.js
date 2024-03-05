import i18next from 'i18next'
import AuthError from '../errors/auth_error.js'
import { get_users } from '../db/queries/users.js'
import { reset_db as resetDB } from '../db/seed/reset_db.js'

// Methods

// GET /
async function get_home (req, res) {
  const users = await get_users()
  res.json({ users })
}

// GET /unauthorized
function get_unauthorized (req, res) {
  res.sendStatus(401)
}

function reset_db (req, res, next) {
  if (req.user.id !== 1) throw new AuthError({ message: i18next.t('errors.not_allowed') })

  try {
    resetDB()
    res.json({ reset_db: true })
  } catch (e) {
    console.error(e)
    return e
  }
}

export default {
  get_home,
  get_unauthorized,
  reset_db
}
