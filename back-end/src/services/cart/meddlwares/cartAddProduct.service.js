const Product = require('../../../models/product.model.js')
const Logger = require('../../Logger.js')

/*
  {
    productCartObject
  }
 */

async function addProductInCart(Cart, detailes, next, reject) {
  try {

    if (! detailes.productCartObject || typeof detailes.productCartObject !== 'object') {
      return reject({
        error: 'productCartObject is required'
      })
    }
    
    if (!Array.isArray(Cart.cart)) {
      Cart.cart = []
    }

    for (const productCartObject of Cart.cart) {
      if (productCartObject.id.toString() === detailes.productCartObject.id.toString()) {
        next()
        return
      }
    }

    const product = await Product.findOne({
      _id: detailes.productCartObject.id
    }, {_id: 1, isAvailable: 1})

    if (product && product.isAvailable) {
      Cart.cart.unshift(detailes.productCartObject)
    }
    next()
  }catch(error) {

    Logger.error({
      message: 'Error in add productCartObject in cart',
      error: error,
    })

    return reject(error)
  }
}

addProductInCart.required = {
  cart: 1
}

module.exports = addProductInCart