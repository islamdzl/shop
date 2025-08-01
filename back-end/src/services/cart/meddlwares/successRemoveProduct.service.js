


/*
  {
    productId
  }
 */

  async function removeProductFromSuccess(Cart, detailes, next, reject) {

  if (! Array.isArray(Cart.success)) {
    next()
    return;
  }

  if (! detailes.productId) {
    reject({
      error: 'Product id is required'
    })
    return 
  }

  Cart.success = Cart.success.filter((productId)=> productId.toString() !== detailes.productId.toString())
  next()
}
removeProductFromSuccess.required = {
  success: 1
}

module.exports = removeProductFromSuccess;