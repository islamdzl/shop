const Product = require('../../models/product.model')
const Logger = require('../Logger')


module.exports = async(priductId, projection)=> {
  try {

    if (typeof priductId !== 'string') {
      throw new Error('Invalid productId')
    }

    const product = await Product.findOne({_id: priductId}, projection)

    return product
  }catch(error) {

    Logger.error({
      message: 'Error in getProduct service',
      error
    })

    return null;
  }
}