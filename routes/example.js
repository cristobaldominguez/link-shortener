import express from 'express'

// Import Controllers
import exampleController from '../controllers/example_controller.js'

// Import Services
import { authenticate, set_user } from '../services/auth_services.js'

// Router Creation
const router = express.Router()

// Routes
// GET /examples/
router.get('/', authenticate, set_user, exampleController.get_index)

export default router
