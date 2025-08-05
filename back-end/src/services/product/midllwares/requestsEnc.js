const Logger = require('../../Logger.js')

/*
  {
    items: 10
  }
 */

async function encrementProductRequests(Product, detailes, next, reject) {
  try{
    Product.requests ++;

    if (Number.isInteger(Product.content) && Number.isInteger(detailes.items)) {
      Product.content -= detailes.items;

      if (Product.content < 0) {
        reject('Requests is big')
        return;
      }
      
      if (Product.content === 0) {
        Product.isAvailable = false;
      }
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

encrementProductRequests.required = {
  requests: 1,
}

module.exports = encrementProductRequests