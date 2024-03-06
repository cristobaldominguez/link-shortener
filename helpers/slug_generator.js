import cryptoRandomString from 'crypto-random-string'

function slugGenerator () {
  return cryptoRandomString({ length: 10, type: 'base64' })
}

export default slugGenerator
