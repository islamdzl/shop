const Product = require('../../../models/product.model.js')
const Logger = require('../../Logger.js')

/*
  {
    productSuccessObject
  }
 */

async function addProductInSuccess(Cart, detailes, next, reject) {
  try {

    if (! detailes.productSuccessObject) {
      return reject({
        error: 'productSuccessObject is required'
      })
    }
    
    if (!Array.isArray(Cart.success)) {
      Cart.success = []
    }

    for (const productSuccessObject of Cart.success) {
      if (productSuccessObject.id.toString() === detailes.productSuccessObject.id.toString()) {
        next()
        return
      }
    }

    Cart.success.unshift(detailes.productSuccessObject)
    next()
  }catch(error) {

    Logger.error({
      message: 'Error in Add productSuccessObject in success',
      error: error,
    })

    return reject(error)
  }
}

addProductInSuccess.required = {
  success: 1
}

module.exports = addProductInSuccess