const Logger = require('../../Logger.js')

/*
  {
    items: 10
  }
 */

async function decrementProductRequests(Product, detailes, next, reject) {
  try{
    Product.requests --;

    if (Number.isInteger(Product.content) && Number.isInteger(detailes.items)) {
      
      if (Product.content === 0) {
        Product.isAvailable = true;
      }

      Product.content += detailes.items;
    }

    next()
  }catch(error) {

    Logger.error({
      message: 'Error in Encrement product requests',
      error
    })

    reject(error);
  }
}

decrementProductRequests.required = {
  requests: 1,
}

module.exports = decrementProductRequests