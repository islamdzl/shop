const Logger = require('../../Logger')


/*
  {
    productId
  }
 */

function createProduct(Store, detailes, next, reject) {
  try {
    if (! detailes.productId) throw new Error('Product id is required')

    if (! Array.isArray(Store.productList)) {
      Store.productList = [];
    }

    Store.productList.unshift(detailes.productId)
    next()
  }catch(error) {

    Logger.error({
      message: 'Error in create product',
      error: error,
    })

    reject(error)
  }
}

createProduct.required = {
  productList: 1
}

module.exports = createProduct;