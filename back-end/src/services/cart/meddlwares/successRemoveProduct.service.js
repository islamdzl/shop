const Logger = require('../../Logger')


/*
  {
    productSuccessId
  }
 */

async function removeProductFromSuccess(Cart, detailes, next, reject) {
  try {

    if (! Array.isArray(Cart.success)) {
      next()
      return;
    }

    if (! detailes.productSuccessId || typeof detailes.productSuccessId !== 'object') {
      reject({
        error: 'productSuccessId is required'
      })
      return 
    }

    Cart.success = Cart.success.filter((productSuccessObject)=> productSuccessObject.id.toString() !== detailes.productSuccessId.toString())
    next()
  }catch(error) {

    Logger.error({
      message: 'Error in remove product success Cart',
      error
    })

    reject(error)
  }
}
removeProductFromSuccess.required = {
  success: 1
}

module.exports = removeProductFromSuccess;