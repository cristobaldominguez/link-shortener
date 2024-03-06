import dotenv from 'dotenv'
import { port } from './config.js'
import express from 'express'
import i18next from 'i18next'
import FilesystemBackend from 'i18next-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'
import sanitizer from 'perfect-express-sanitizer'

// ErrorHandling
import 'express-async-errors'

// Routes
import mainRoutes from './routes/main.js'
import authRoutes from './routes/auth.js'
import registerRoutes from './routes/register.js'

// Middlewares
import errorMiddleware from './middlewares/error_middleware.js'
import acceptsFormatMiddleware from './middlewares/accepts_format_middleware.js'
import setContentType from './middlewares/set_content_type.js'
import checkValidJSON from './middlewares/check_valid_JSON_middleware.js'

// Helpers
import { nonExistentRoute } from './helpers/non_existent_route.js'

// dotEnv Config
dotenv.config()

// Server
const app = express()

// i18n Config
i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(FilesystemBackend)
  .init({
    fallbackLng: 'es',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  })

// body-parser -> From Express 4.16+
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Check JSON Formatting
app.use(checkValidJSON)

// Request Accepts HTML
app.use(acceptsFormatMiddleware)

// Perfect Express Sanitizer middleware
app.use(sanitizer.clean({ xss: true, sql: true, sqlLevel: 4 }))

// Sets Content-Type header
app.use(setContentType)

// Public Folder
app.use(express.static('public'))

// App Routes
app.use(mainRoutes)
app.use('/auth', authRoutes)
app.use('/registers', registerRoutes)

// Redirect to 404 Page
app.get('*', nonExistentRoute)

app.use(errorMiddleware)

// Server Running
app.listen(port, _ => console.log(`Server Running at: http://localhost:${port}`))
