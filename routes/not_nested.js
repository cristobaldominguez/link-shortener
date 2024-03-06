import express from 'express'

// Import Controllers
import registerController from '../controllers/register_controller.js'

// Router Creation
const router = express.Router()

// Routes
// GET /:slug
router.get('/:slug', registerController.getRegister)

export default router
