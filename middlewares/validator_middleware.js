import validators from '../validators/index.js'
import ValidationError from '../errors/validation_error.js'
import getURLScope from '../helpers/get_url_scope.js'

function validator (validator) {
  return async function (req, res, next) {
    const url = validator ?? getURLScope(req)

    try {
      const validated = await validators[url].validateAsync(req.body, { abortEarly: false })
      req.body = validated

      next()
    } catch (err) {
      console.log(err)
      if (err.isJoi) throw new ValidationError({ message: err.message, status: 422 })

      next()
    }
  }
}

export default validator
