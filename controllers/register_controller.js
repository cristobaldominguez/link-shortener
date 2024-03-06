import { createRegister, getRegisters } from '../db/queries/registers.js'
import slugGenerator from '../helpers/slug_generator.js'

// Methods
// GET /registers
async function getIndex (req, res) {
  const registers = await getRegisters()

  res.json({ registers })
}

// POST /registers
async function postRegister (req, res) {
  const { id: userId } = req.user
  req.body.slug = req.body.slug ?? slugGenerator()
  const { slug, url } = req.body

  const register = await createRegister({ slug, url, userId })

  res.json({ register })
}

export default {
  getIndex,
  postRegister
}
