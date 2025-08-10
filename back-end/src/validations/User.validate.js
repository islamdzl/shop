const joi = require('joi')
const appConstants = require('../constnts/app')

exports.register = (data = {})=> {
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
  
  return schema.validate(data);
}

exports.login = (data = {})=> {
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
  return schema.validate(data);
}

exports.changeRole = (data)=> {
  const schema = joi.object({
    role: joi.string().valid(...appConstants.roles.filter((role)=> role !== 'admin'))
  })

  return schema.validate(data)
}