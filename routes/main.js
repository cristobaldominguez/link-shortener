import express from 'express'

// Import Controllers
import mainController from '../controllers/main_controller.js'

// Import Services
import { authenticate, setUser } from '../services/auth_services.js'

// Router Creation
const router = express.Router()

// Routes
// GET /
router.get('/', mainController.getHome)

// GET /unauthorized
router.get('/unauthorized', mainController.getUnauthorized)

// POST /reset_db
router.post('/reset_db', authenticate, setUser, mainController.resetDb)

export default router
