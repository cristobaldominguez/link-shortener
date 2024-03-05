import { getUrls } from '../db/queries/urls.js'

// Methods
// GET /urls
async function getIndex (req, res) {
  const urls = await getUrls()

  res.json({ urls })
}

// POST /urls
async function postURL (req, res) {

}

export default {
  getIndex,
  postURL
}
