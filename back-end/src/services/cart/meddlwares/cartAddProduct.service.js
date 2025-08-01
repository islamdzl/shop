const Product = require('../../../models/product.model.js')
const Logger = require('../../Logger.js')

/*
  {
    productId
  }
 */

async function addProductInCart(Cart, detailes, next, reject) {
  try {

    if (! detailes.productId) {
      return reject({
        error: 'Product id is required'
      })
    }
    
    if (!Array.isArray(Cart.cart)) {
      Cart.cart = []
    }

    if (Cart.cart.includes(detailes.productId)) {
      next()
      return
    }

    const product = await Product.findOne({
      _id: detailes.productId
    }, {_id: 1, isAvailable: 1})

    if (product && product.isAvailable) {
      Cart.cart.unshift(detailes.productId)
    }
    next()
  }catch(error) {

    Logger.error({
      message: `Error in Add item in cart: ${error.message}`,
      error: error,
      context: { productId: detailes.productId }
    })

    return reject({
      error: 'Error in add product in cart'
    })
  }
}

addProductInCart.required = {
  cart: 1
}

module.exports = addProductInCart