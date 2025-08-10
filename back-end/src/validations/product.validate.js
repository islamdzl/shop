
const joi = require('joi')


exports.create = (data = {})=> {
  const schema = joi.object({
  name: joi.string().min(3).max(20).required(),
  ownerId: joi.object().required(),
  stack: joi.number().min(1).default(null),
  price: joi.number().min(0).default(0),
  isAvailable: joi.boolean().default(true),
  description: joi.string().default('No discription !'),
  categories: joi.array().min(1).required(),
  delivery: joi.number().default(null),
  requests: joi.number().min(0).default(0)
  })

  return  schema.validate(data)
}

exports.getProduct = (data)=> {

  const schema = joi.object({
    productId: joi.string().hex().length(24).required()
  })

  return schema.validate(data)
}

exports.buyProduct = (data = {})=> {
  const schema = joi.object({
    product: joi.object({
      id: joi.object().required(),
      count: joi.number().default(1).min(1).max(1000)
    }),

    buyingDetailes: joi.object({
      fullName: joi.string().trim().min(7).max(30),
      state: joi.number().required().min(1).max(58),
      city: joi.string().min(3).max(30),
      phone1: joi.string().min(10).max(11).required(),
      phone2: joi.string().min(10).max(11),
      description: joi.string().max(300),
      deliveryToHome: joi.boolean().default(false)
    }).default(null)
  })

  return schema.validate(data)
}

exports.setAvailable = (data)=> {

  const schema = joi.object({
    productId: joi.string().hex().length(24).required(),
    available: joi.boolean().required(),
    stack: joi.number().min(1).default(null)
  })

  return schema.validate(data)
}