// Import Config
import { redirect, cookieName } from '../config.js'

// Import Services
import authServices from '../services/auth_services.js'

// Methods
// POST /auth/signup
async function postSignup (req, res) {
  const token = await authServices.postSignup(req, res)

  if (req.expects_html) {
    if (token.is_an_error) return res.status(req.error.status).render('auth/signup', { error: req.error.toJson(), user: { email: req.body.email } })

    res.cookie(cookieName, token.accessToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.redirect(redirect.after.signup)
  }

  if (token.is_an_error) throw token

  res.status(200).json(token)
}

// POST /auth/login
async function postLogin (req, res) {
  const token = await authServices.postLogin(req, res)

  if (req.expects_html) {
    if (token.is_an_error) return res.status(req.error.status).render('auth/login', { error: req.error.toJson(), user: { email: req.body.email } })

    res.cookie(cookieName, token.accessToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.redirect(redirect.after.login)
  }

  if (token.is_an_error) throw token

  res.status(200).json(token)
}

// DELETE /auth/logout
function deleteLogout (_, res) {
  res.clearCookie(cookieName)
  res.redirect(redirect.after.logout)
}

export default {
  postSignup,
  postLogin,
  deleteLogout
}
