


/*
  {
    productId
  }
 */

async function removeProductFromCart(Cart, detailes, next, reject) {

  if (! Array.isArray(Cart.cart)) {
    next()
    return;
  }

  if (! detailes.productId) {
    reject({
      error: 'Product id is required'
    })
    return 
  }

  Cart.cart = Cart.cart.filter((productId)=> productId.toString() !== detailes.productId.toString())
  next()
}
removeProductFromCart.required = {
  cart: 1
}

module.exports = removeProductFromCart;