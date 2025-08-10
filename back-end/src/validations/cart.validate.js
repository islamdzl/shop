const joi = require('joi')




exports.shoppingCartAddIProduct = (data)=> {

  const schema = joi.object({
    productId: joi.string().hex().length(24).required(),
    count: joi.number().min(1).required()
  })

  return schema.validate(data)
}

exports.shoppingCartremoveProduct = (data)=> {

  const schema = joi.object({
    prodictId: joi.string().hex().length(24).required()
  })

  return schema.validate(data)
}