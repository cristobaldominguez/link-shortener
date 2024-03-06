import Joi from 'joi'

const registersSchema = Joi.object({
  slug: Joi.string().trim().alphanum().min(4).lowercase(),
  url: Joi.string().uri().required()
})

export default registersSchema
