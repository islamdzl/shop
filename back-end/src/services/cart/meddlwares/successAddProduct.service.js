const Product = require('../../../models/product.model.js')
const Logger = require('../../Logger.js')

/*
  {
    productId
  }
 */

async function addProductInSuccess(Cart, detailes, next, reject) {
  try {

    if (! detailes.productId) {
      return reject({
        error: 'Product id is required'
      })
    }
    
    if (!Array.isArray(Cart.success)) {
      Cart.success = []
    }

    if (Cart.success.includes(detailes.productId)) {
      next()
      return
    }

    const product = await Product.findOne({
      _id: detailes.productId
    }, {_id: 1, isAvailable: 1})

    if (product && product.isAvailable) {
      Cart.success.unshift(detailes.productId)
    }
    next()
  }catch(error) {

    Logger.error({
      message: `Error in Add item in success: ${error.message}`,
      error: error,
      context: { productId: detailes.productId }
    })

    return reject({
      error: 'Error in add product in success'
    })
  }
}

addProductInSuccess.required = {
  success: 1
}

module.exports = addProductInSuccess