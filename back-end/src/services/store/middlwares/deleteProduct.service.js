const Logger = require('../../Logger')


/*
  {
    productId
  }
 */

function deleteProduct(Store, detailes, next, reject) {

  try{

    if (! Array.isArray(Store.productList)) {
      Store.productList = []
      next()
      return;
    }

    if (Store.productList.includes(detailes.productId)) {
      Store.productList = Store.productList.filter((id)=> id.toString() !== detailes.productId.toString())
    }

    next()
  }catch(error) {

    Logger.error({
      message: 'Error in delete product Store',
      error
    })

    reject(error)
  }
}

deleteProduct.required = {
  productList: 1
}

module.exports = deleteProduct;