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


exports.request = (requestDetailes)=> {

  const schema = joi.object({
    
    clientId: joi.string().default(null),

    fullName: joi.string().required().trim().min(7).messages({
      'string.empty': 'الاسم الكامل لا يمكن أن يكون فارغًا',
      'any.required': 'الاسم الكامل مطلوب'
    }),

    state: joi.number().required().messages({
      'any.required': 'الولاية مطلوبة'
    }),

    city: joi.string().required().messages({
      'any.required': 'المدينة مطلوبة'
    }),

    phone1: joi.string().required().min(8).max(11).messages({
      'string.empty': 'رقم الهاتف الأول مطلوب',
      'string.min': 'رقم الهاتف الأول قصير جدًا',
      'string.max': 'رقم الهاتف الأول طويل جدًا',
      'any.required': 'رقم الهاتف الأول مطلوب'
    }),

    phone2: joi.string().min(8).max(11).messages({
      'string.min': 'رقم الهاتف الثاني قصير جدًا',
      'string.max': 'رقم الهاتف الثاني طويل جدًا',
    }),

    description: joi.string().max(70).messages({
      'string.max': 'الوصف لا يجب أن يتجاوز 70 حرفًا'
    }),

    productId: joi.string().required().messages({
      'number.base': 'معرف المنتج غير صالح',
      'any.required': 'معرف المنتج مطلوب'
    }),

    count: joi.number().min(1).max(100).messages({
      'number.base': 'عدد المنتجات يجب أن يكون رقمًا',
      'number.min': 'العدد الأدنى للمنتج هو 1',
      'number.max': 'العدد الأقصى للمنتج هو 100'
    }),

    fullPrice: joi.number()
  })

  return validateReturner(schema, requestDetailes)
}