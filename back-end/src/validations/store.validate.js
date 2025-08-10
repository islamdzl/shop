const joi = require('joi')


exports.getStore = (data = {})=> {

  const schema = joi.object({
    storeId: joi.string().hex().length(24).required()
  })

  return schema.validate(data)
}

exports.setActivty = (data)=> {

  const schema = joi.object({
    activty: joi.boolean().required()
  })

  return schema.validate(data)
}

exports.addRating = (data)=> {

  const schema = joi.object({
    storeId: joi.string().hex().length(24).required(),
    rating: joi.number().required().min(0).max(10).default(5)
  })

  return schema.validate(data)
}

exports.setOpen = (data)=> {

  const schema = joi.object({
    open: joi.boolean().required()
  })

  return schema.validate(data)
}
