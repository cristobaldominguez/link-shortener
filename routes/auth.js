import express from 'express'

// Import Controllers
import authController from '../controllers/auth_controller.js'

// Router Creation
const router = express.Router()

// Routes
// /auth/signup
router.route('/signup')
  .post(auth_controller.post_signup)
  .get(authController.get_signup)

// /auth/login
router.route('/login')
  .post(auth_controller.post_login)
  .get(authController.get_login)

// /auth/logout
router.route('/logout')
  .delete(authController.delete_logout)

export default router
