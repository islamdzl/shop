const Validations = require('../../validations')

/*
    clientId: joi.string(),

    fullName: joi.string().required().trim().min(7)

    state: joi.number().required().messages({

    city: joi.string().required().messages({

    phone1: joi.string().required().min(8).max(11)

    phone2: joi.string().min(8).max(11)

    description: joi.string().max(70)

    productId: joi.string().required()

    count: joi.number().min(1).max(100)

    fullPrice: joi.number()

*/

module.exports = (requestDetailes)=> {
  return Validations.StoreValidate.request(requestDetailes)
}