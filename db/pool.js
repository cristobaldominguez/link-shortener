import pg from 'pg'
import { db as pgConnection } from '../config.js'

const { Pool } = pg
const pool = new Pool(pgConnection)

export default pool
