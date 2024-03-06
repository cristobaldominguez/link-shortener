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
  .post(validator('signup'), authController.postSignup)

// /auth/login
router.route('/login')
  .post(validator(), authController.postLogin)

// /auth/logout
router.route('/logout')
  .delete(authController.deleteLogout)

export default router
