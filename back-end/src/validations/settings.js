const joi = require('joi')

exports.updateBuyingDetailes = (data)=> {

  const schema = joi.object({

    fullName: joi.string().required().trim().min(7),
    state: joi.number().min(1).max(58).required(),
    city: joi.string().required().min(4).trim(),
    phone1: joi.string().min(8).max(11).trim().required(),
    phone2: joi.string().min(8).max(11).trim(),
    description: joi.string().max(70).trim(),
    deliveryToHome: joi.boolean().default(false)
  }).required()

  return schema.validate(data)
}