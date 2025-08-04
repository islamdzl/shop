const Product = require('../../../models/product.model.js')
const Logger = require('../../Logger.js')

/*
  {
    productBuyingObject: {
      id: string uuid,

    }
  }
 */

async function addProductInBuying(Cart, detailes, next, reject) {
  try {

    if (! detailes.productBuyingObject || typeof detailes.productBuyingObject !== "object") {
      return reject({
        error: 'ProductObjectBuying is required'
      })
    }
    
    if (!Array.isArray(Cart.buying)) {
      Cart.buying = []
    }

    for (const productBuyingObject of Cart.buying) {
      if (productBuyingObject.id.toString() === detailes.productBuyingObject.id.toString()) {
        next()
        return
      }
    }

    const product = await Product.findOne({
      _id: detailes.productBuyingObject.id
    }, {_id: 1, isAvailable: 1})

    if (product && product.isAvailable) {
      Cart.buying.unshift(detailes.productBuyingObject)
    }
    next()
  }catch(error) {

    Logger.error({
      message: 'Error in Add item in buying',
      error: error,
    })

    return reject(error)
  }
}

addProductInBuying.required = {
  buying: 1
}

module.exports = addProductInBuying