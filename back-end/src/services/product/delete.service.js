const mongoose = require('mongoose');
const Product = require('../../models/product.model')
const Logger = require('../Logger')

module.exports = async(productId)=> {
  try {
    if (! mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid product Id')
    }

    const result = await Product.deleteOne({
      _id: productId
    })
    
    if (result.deletedCount === 0) return false;

    return true;
  }catch(error) {

    Logger.error({
      message: 'Error in delete product',
      error
    })

    return false;
  }
}