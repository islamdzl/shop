


/*
  {
    productCartId
  }
 */

const Logger = require("../../Logger");

async function removeProductFromCart(Cart, detailes, next, reject) {

  try {
    if (! Array.isArray(Cart.cart)) {
      next()
      return;
    }

    if (! detailes.productCartId) {
      reject({
        error: 'productCartId is required'
      })
      return 
    }

    Cart.cart = Cart.cart.filter((productCartObject)=> productCartObject.id.toString() !== detailes.productCartId.toString())
    next()
  }catch(error) {
    Logger.error({
      message: 'Error in remove product Cart',
      error
    })

    reject(error)
  }
}
removeProductFromCart.required = {
  cart: 1
}

module.exports = removeProductFromCart;