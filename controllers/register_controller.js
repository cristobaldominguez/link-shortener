import i18next from 'i18next'

import ContentError from '../errors/content_error.js'
import slugGenerator from '../helpers/slug_generator.js'

import { createRegister, getRegisterBy, getRegisters } from '../db/queries/registers.js'

// Resources
import forbiddenSlugs from '../resources/forbidden_slugs.js'

// Methods
// GET /registers
async function getIndex (req, res) {
  const registers = await getRegisters()

  res.json({ registers })
}

// POST /registers
async function postRegister (req, res) {
  req.body.slug = req.body.slug ?? slugGenerator()
  const { slug, url } = req.body
  if (forbiddenSlugs.includes(slug)) throw new ContentError({ message: i18next.t('errors.forbidden_slug', { slug }) })

  const { id: userId } = req.user
  const register = await createRegister({ slug, url, userId })

  res.json({ register })
}

// GET /:slug
async function getRegister (req, res) {
  const { slug } = req.params

  const { url } = await getRegisterBy({ slug })
  res.redirect(url)
}

export default {
  getIndex,
  getRegister,
  postRegister
}
