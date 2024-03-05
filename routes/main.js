import express from 'express'

// Import Controllers
import mainController from '../controllers/main_controller.js'

// Import Services
import { authenticate, set_user } from '../services/auth_services.js'

// Router Creation
const router = express.Router()

// Routes
// GET /
router.get('/', mainController.get_home)

// GET /unauthorized
router.get('/unauthorized', mainController.get_unauthorized)

// POST /reset_db
router.post('/reset_db', authenticate, set_user, mainController.reset_db)

export default router
