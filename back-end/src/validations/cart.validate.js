const joi = require('joi')

const validateReturner = (schema, data)=> {
  if (! data) {
    return {
      valid: false,
      errors: 'Invalid Data'
    }
  }
  
  const { error, value } = schema.validate(data)
  if (error) {
    return null;
  }
  return value;
}

const validateErrorReturner = (schema, data)=> {
    if (! data) {
    return {
      valid: false,
      errors: 'Invalid Data'
    }
  }
  
  const { error, value } = schema.validate(data)
  if (error) {
    return {
      valid: false,
      errors: error.details.map(e => e.message)
    }
  }
  return { valid: true, value }
}


exports.shoppingCart = (data)=> {

  const schema = joi.object({
    id: joi.object().required(),
    ownerId: joi.object().required(),
    name: joi.string().max(50),
    price: joi.number().required(),
    preview: joi.string().default('https://shipkar.co.in/shop/wp-content/uploads/2022/12/corrugated-box.jpg'),
    count: joi.number().min(1).max(100),
  })

  return validateReturner(schema, data)
}

exports.buying = (data)=> {

  const schema = joi.object({
    id: joi.object().required(),
    ownerId: joi.object().required(),
    name: joi.string().max(50),
    price: joi.number().required(),
    preview: joi.string().default('https://shipkar.co.in/shop/wp-content/uploads/2022/12/corrugated-box.jpg'),
    count: joi.number().min(1).max(100),
    status: joi.number().default(0),
  })

  return validateReturner(schema, data)
}

exports.success = (data)=> {

  const schema = joi.object({
    id: joi.object().required(),
    ownerId: joi.object().required(),
    name: joi.string().max(50),
    price: joi.number().required(),
    preview: joi.string().default('https://shipkar.co.in/shop/wp-content/uploads/2022/12/corrugated-box.jpg'),
    count: joi.number().min(1).max(100),
  })

  return validateReturner(schema, data)
}






exports.buyingDetailes = (requestDetailes)=> {

  const schema = joi.object({

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

    fullPrice: joi.number()
  })

  return validateErrorReturner(schema, requestDetailes)
}