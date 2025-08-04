const joi = require('joi')

const validateReturner = (schema, data)=> {
  const { error, value } = schema.validate(data)
  if (error) {
    return null;
  }
  return value;
}


exports.shoppingCart = (data)=> {

  const schema = joi.object({
    id: joi.object().required(),
    ownerId: joi.object().required(),
    name: joi.string().max(50),
    price: joi.number().required(),
    previow: joi.string().default('https://shipkar.co.in/shop/wp-content/uploads/2022/12/corrugated-box.jpg'),
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
    previow: joi.string().default('https://shipkar.co.in/shop/wp-content/uploads/2022/12/corrugated-box.jpg'),
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
    previow: joi.string().default('https://shipkar.co.in/shop/wp-content/uploads/2022/12/corrugated-box.jpg'),
    count: joi.number().min(1).max(100),
  })

  return validateReturner(schema, data)
}