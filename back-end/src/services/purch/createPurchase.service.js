const Logger = require('../Logger')
const Validations = require('../../validations/index')
const Purchase = require('../../models/purchase.model')


/*
  * Array of Purchase Object
    [ {Purchase Object} ]

    {
      id: joi.object().required(),
      ownerId: joi.object().required(),
      price: joi.number().required(),
      name: joi.string().max(50),
      previow: joi.string().default('https://shipkar.co.in/shop/wp-content/uploads/2022/12/corrugated-box.jpg'),
      count: joi.number().min(1).max(100),
    }

  Auto validate •
*/
module.exports = async(purchs)=> {
  try {
    
    if (! Array.isArray(purchs) || purchs.length === 0) {
      throw new Error('Purchs is required')
    }
    
    const validPurchs = purchs.map((item)=> Validations.purchase(item)).filter(Boolean)

    await Purchase.insertMany(validPurchs, { ordered: false })

    return true;

  }catch(error) {

    Logger.error({
      message: 'Error in create purchs',
      error
    })
  }
  return false;
};