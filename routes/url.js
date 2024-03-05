import express from 'express'

// Import Controllers
import urlController from '../controllers/url_controller.js'

// Import Services
import { authenticate, setUser } from '../services/auth_services.js'

// Router Creation
const router = express.Router()

// Routes
// GET /urls
router.route('/')
  .get(authenticate, setUser, urlController.getIndex)
  .post(authenticate, setUser, urlController.postURL)

export default router
