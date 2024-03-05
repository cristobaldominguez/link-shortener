import express from 'express'

// Import Controllers
import authController from '../controllers/auth_controller.js'

// Import Middlewares
import validator from '../middlewares/validator_middleware.js'

// Router Creation
const router = express.Router()

// Routes
// /auth/signup
router.route('/signup')
  .get(authController.get_signup)
  .post(validator('register'), authController.post_signup)

// /auth/login
router.route('/login')
  .get(authController.get_login)
  .post(validator(), authController.post_login)

// /auth/logout
router.route('/logout')
  .delete(authController.delete_logout)

export default router
