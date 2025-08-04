

/*
  {
    productBuyingId
  }
 */

const Logger = require("../../Logger");

async function removeProductFromBuying(Cart, detailes, next, reject) {

  try {
      if (! Array.isArray(Cart.buying)) {
      next()
      return;
    }

    if (! detailes.productBuyingId) {
      reject({
        error: 'Product id is required'
      })
      return 
    }

    Cart.buying = Cart.buying.filter((productBuyingObject)=> productBuyingObject.id.toString() !== detailes.productBuyingId.toString())
    
    next()

  }catch(error) {

    Logger.error({
      message: 'Error in remove buying product Cart',
      error
    })

    reject(error)
  }
}
removeProductFromBuying.required = {
  buying: 1
}

module.exports = removeProductFromBuying;