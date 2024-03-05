import i18next from 'i18next'
import AuthError from '../errors/auth_error.js'
import { getUsers } from '../db/queries/users.js'
import seed from '../db/seed/reset_db.js'

// Methods
// GET /
async function getHome (req, res) {
  const users = await getUsers()
  res.json({ users })
}

// GET /unauthorized
function getUnauthorized (req, res) {
  res.sendStatus(401)
}

// POST /reset_db
function resetDb (req, res, next) {
  if (req.user.id !== 1) throw new AuthError({ message: i18next.t('errors.not_allowed') })

  try {
    seed.resetDb()
    res.json({ reset_db: true })
  } catch (e) {
    console.error(e)
    return e
  }
}

export default {
  getHome,
  getUnauthorized,
  resetDb
}
