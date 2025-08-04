const joi = require('joi')

const validateReturner = (schema, data)=> {
  const { error, value } = schema.validate(data)
  if (error) {
    return null;
  }
  return value;
}


exports.categori = (categori)=> {
  const schema = joi.object({
    name: joi.string().required().min(3).max(20),
    ref: joi.string().required().min(5).max(5),
    allProduct: joi.number().default(0),
  })

  return validateReturner(schema, data)
}