import dotenv from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// dotEnv Config
dotenv.config()

// with 24 hour of token expiration
const expirationToken = '24h'

// Email format
const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

const port = process.env.PORT || 3000
const root = dirname(fileURLToPath(import.meta.url))

const accessTokenSecret = process.env.SECRET_KEY
const cookie_name = process.env.COOKIE_NAME

const redirect = {
  after: {
    login: '/',
    logout: '/',
    signup: '/',
  },
  for_unauthorized: '/auth/login'
}

const db = {
  host: process.env.DB_HOST || 'db',
  user: process.env.POSTGRES_USER || 'pg_username',
  password: process.env.POSTGRES_PWD || 'pg_password',
  database: process.env.POSTGRES_DB || 'db_name',
  port: Number(process.env.DB_PORT) || 5432,
  allowExitOnIdle: true
}

export { port, root, db, redirect, email_regex, expirationToken, accessTokenSecret, cookie_name }
