import express from 'express'

// Import Controllers
import registerController from '../controllers/register_controller.js'

// Import Services
import { authenticate, setUser } from '../services/auth_services.js'

// Middlewares
import validator from '../middlewares/validator_middleware.js'

// Router Creation
const router = express.Router()

// Routes
// /registers
router.route('/')
  .get(authenticate, setUser, registerController.getIndex)
  .post(authenticate, setUser, validator(), registerController.postRegister)

export default router
