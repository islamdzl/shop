const Product = require('../../../models/product.model.js')
const Logger = require('../../Logger.js')

/*
  {
    productId
  }
 */

async function addProductInBuying(Cart, detailes, next, reject) {
  try {

    if (! detailes.productId) {
      return reject({
        error: 'Product id is required'
      })
    }
    
    if (!Array.isArray(Cart.buying)) {
      Cart.buying = []
    }

    if (Cart.buying.includes(detailes.productId)) {
      next()
      return
    }

    const product = await Product.findOne({
      _id: detailes.productId
    }, {_id: 1, isAvailable: 1})

    if (product && product.isAvailable) {
      Cart.buying.unshift(detailes.productId)
    }
    next()
  }catch(error) {

    Logger.error({
      message: `Error in Add item in buying: ${error.message}`,
      error: error,
      context: { productId: detailes.productId }
    })

    return reject({
      error: 'Error in add product in buying'
    })
  }
}

addProductInBuying.required = {
  buying: 1
}

module.exports = addProductInBuying