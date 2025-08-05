
const joi = require('joi')

const validateReturner = (schema, data)=> {
  const { error, value } = schema.validate(data)
  if (error) {
    return {
      valid: false,
      errors: error.details.map(e => e.message)
    }
  }
  return { valid: true, value }
}

exports.create = (data)=> {
  const schema = joi.object({
  name: joi.string().min(3).max(20).required().messages({
    'string.min': 'الاسم قصير بزاف',
    'string.max': 'الاسم طويل بزاف',
    'any.required': 'الاسم مطلوب'
  }),

  ownerId: joi.object().required(),

  content: joi.number().min(1).default(null),
  
  price: joi.number().min(0).default(0),

  isAvailable: joi.boolean().default(true),

  description: joi.string().default('No discription !'),

  imagesUrls: joi.array().min(1).required(),

  categories: joi.array().min(1).required(),

  delivery: joi.number().default(null)
  })

  return validateReturner(schema, data)
}