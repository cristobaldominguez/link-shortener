import express from 'express'

// Import Controllers
import example_controller from '../controllers/example_controller.js'

// Import Services
import { authenticate, set_user } from '../services/auth_services.js'

// Router Creation
const router = express.Router()

// Routes
// GET /examples/
router.get( '/', authenticate, set_user, example_controller.get_index )

export default router
