const joi = require('joi')

const validateReturner = (schema, data)=> {
  const { error, value } = schema.validate(data)
  if (error) {
    return null;
  }
  return value;
}


exports.createObjectDB = (data)=> {

  const schema = joi.object({
    userId: joi.string().required(),
    packageId: joi.string().required(),
    fileNames: joi.array(),
  })

  return validateReturner(schema, data)
}
