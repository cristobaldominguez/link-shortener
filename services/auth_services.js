import bcrypt from 'bcrypt'
import i18next from 'i18next'
import jwt from 'jsonwebtoken'

// Import Queries
import { createUser, getUserBy } from '../db/queries/users.js'

// ErrorHandling
import AuthError from '../errors/auth_error.js'
import CustomError from '../errors/custom_error.js'

// Import Config
import { redirect, expirationToken, accessTokenSecret, cookieName } from '../config.js'

// Helpers
import tokenIsExpirated from '../helpers/token_is_expirated.js'

if (!accessTokenSecret) console.error('Error: No SECRET_KEY inside .env file')
if (!cookieName) console.error('Error: No COOKIE_NAME inside .env file')

// POST /auth/signup
async function post_signup (req) {
  if (!req.body.email) throw new ValidationError({ message: i18next.t('errors.no_presence', { field: i18next.t('fields.email') }), field: 'fields.email' })
  if (!req.body.password) throw new ValidationError({ message: i18next.t('errors.no_presence', { field: i18next.t('fields.password') }), field: 'fields.password' })
  if (!req.body.password_confirm) throw new ValidationError({ message: i18next.t('errors.no_presence', { field: i18next.t('fields.password_confirm') }), field: 'fields.password_confirm' })

  const email = req.sanitize(req.body.email).toLowerCase()
  const { password, password_confirm } = req.body

  if (!email.match(email_regex)) { throw new AuthError({ message: i18next.t('errors.not_valid', { field: i18next.t('fields.email') }) }) }

  if (!(email && password)) return new AuthError({ message: i18next.t('errors.data_format') })
  if (password !== password_confirm) return new AuthError({ message: i18next.t('errors.no_presence', { first: i18next.t('fields.password'), second: i18next.t('fields.password_confirm') }) })

  // creating a new user
  const user = { email, password }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10)

  // set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt)

  try {
    const savedUser = await createUser(user)
    return generateToken({ user: await savedUser })
  } catch (err) {
    console.error(err)
    if (err.is_an_error) {
      req.error = err
      return err
    }

    return new CustomError()
  }
}

// POST /auth/login
async function post_login (req) {
  if (!req.body.email) throw new ValidationError({ message: i18next.t('errors.no_presence', { field: i18next.t('fields.email') }) })
  if (!req.body.password) throw new ValidationError({ message: i18next.t('errors.no_presence', { field: i18next.t('fields.password') }) })

  const email = req.sanitize(req.body.email).toLowerCase()
  const { password } = req.body

  if (!email.match(email_regex)) { throw new AuthError({ message: i18next.t('errors.not_valid', { field: i18next.t('fields.email') }) }) }

  const user = await getUserBy({ email })
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password)

    if (validPassword) {
      return generateToken({ user })
    } else {
      return new AuthError({ message: i18next.t('errors.invalid_email_password'), status: 400 })
    }
  } else {
    return new AuthError({ message: i18next.t('errors.invalid_email_password'), status: 401 })
  }
}

// Middlewares
function authenticate (req, res, next) {
  const jwtAuth = req.headers.authorization

  // Get token
  const token = getTokenFromJWT(jwtAuth)
  if (!token) return res.redirect(redirect.for_unauthorized)

  // Verify token
  const decoded = jwt.decode(token)
  if (tokenIsExpirated(decoded)) throw new AuthError({ message: i18next.t('errors.token_expired') })

  req.token = token
  next()
}

function setUser (req, _, next) {
  req.user = null
  if (!req.token) return

  jwt.verify(req.token, accessTokenSecret, (err, user) => {
    if (err) return

    req.user = user
    next()
  })
}

function getTokenFromJWT (bearer) {
  return bearer.split(' ')[1]
}

function generateToken ({ user }) {
  const token = jwt.sign(user, accessTokenSecret, { expiresIn: expirationToken })
  const { id, email } = user
  return {
    user: {
      id,
      email
    },
    accessToken: token
  }
}

export {
  setUser,
  authenticate,
  generateToken
}

export default { postSignup, postLogin }
