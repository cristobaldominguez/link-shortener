import i18next from 'i18next'
import ValidationError from '../errors/validation_error.js'

function convertToNumber (num) {
  return typeof num === 'number' && !isNaN(num)
}

function checkParam (req, res, next) {
  const { params } = req
  const checking = []

  for (const key in params) {
    checking.push(parseInt(params[key], 10))
  }

  const error = checking.map(param => convertToNumber(param)).some(num => num === false)
  if (error) throw new ValidationError({ message: i18next.t('errors.invalid_parameter') })

  next()
}

export default checkParam
