import { getRegisters } from '../db/queries/registers.js'
import slugGenerator from '../helpers/slug_generator.js'

// Methods
// GET /registers
async function getIndex (req, res) {
  const registers = await getRegisters()

  res.json({ registers })
}

// POST /registers
async function postRegister (req, res) {
  req.body.slug = req.body.slug ?? slugGenerator()
  const { slug, address } = req.body

  console.log({ slug, address })
  res.json({ slug, address })
}

export default {
  getIndex,
  postRegister
}
