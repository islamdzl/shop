

/*
  {
    productId
  }
 */

async function removeProductFromBuying(Cart, detailes, next, reject) {

  if (! Array.isArray(Cart.buying)) {
    next()
    return;
  }

  if (! detailes.productId) {
    reject({
      error: 'Product id is required'
    })
    return 
  }

  Cart.buying = Cart.buying.filter((productId)=> productId.toString() !== detailes.productId.toString())
  next()
}
removeProductFromBuying.required = {
  buying: 1
}

module.exports = removeProductFromBuying;