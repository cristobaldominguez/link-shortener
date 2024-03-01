import express from 'express'

// Import Controllers
import main_controller from '../controllers/main_controller.js'

// Import Services
import { authenticate, set_user } from '../services/auth_services.js'

// Router Creation
const router = express.Router()

// Routes
// GET /
router.get('/', main_controller.get_home)

// GET /unauthorized
router.get('/unauthorized', main_controller.get_unauthorized)

// POST /reset_db
router.post('/reset_db', authenticate, set_user, main_controller.reset_db)

export default router
