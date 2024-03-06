import Joi from 'joi'

const registerSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
  password_confirm: Joi.ref('password')
})

export default registerSchema
