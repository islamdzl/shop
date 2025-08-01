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


exports.register = (data)=> {
  const schema = joi.object({
    username: joi.string().min(3).max(10),
    email: joi.string().email(),
    password: joi.string().required()
  })
  .or('username', 'email')
  .messages({
    'object.missing': 'يرجى إدخال إما اسم المستخدم أو البريد الإلكتروني',
    'string.min': '{#label} قصير بزاف',
    'string.max': '{#label} طويل بزاف',
    'string.email': 'البريد الإلكتروني غير صالح',
    'any.required': '{#label} إجباري'
  })
  return validateReturner(schema, data)
}

exports.login = (data)=> {
  const schema = joi.object({
    username: joi.string().min(3).max(10),
    email: joi.string().email(),
    password: joi.string().required()
  })
  .or('username', 'email')
  .messages({
    'object.missing': 'يرجى إدخال إما اسم المستخدم أو البريد الإلكتروني',
    'string.min': '{#label} قصير بزاف',
    'string.max': '{#label} طويل بزاف',
    'string.email': 'البريد الإلكتروني غير صالح',
    'any.required': '{#label} إجباري'
  })
  return validateReturner(schema, data)
}