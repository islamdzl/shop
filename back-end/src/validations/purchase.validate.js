const joi = require('joi')

module.exports = (data = {})=> {
  const schema = joi.object({
    id: joi.object().required(),
    ownerId: joi.object().required(),
    name: joi.string().max(50),
    price: joi.number().required(),
    previow: joi.string().default('https://shipkar.co.in/shop/wp-content/uploads/2022/12/corrugated-box.jpg'),
    count: joi.number().min(1).max(100),
  })

  return schema.validate(data)
}