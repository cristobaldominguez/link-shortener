import express from 'express'

// Import Controllers
import exampleController from '../controllers/example_controller.js'

// Import Services
import { authenticate, setUser } from '../services/auth_services.js'

// Router Creation
const router = express.Router()

// Routes
// GET /examples/
router.get('/', authenticate, setUser, exampleController.getIndex)

export default router
