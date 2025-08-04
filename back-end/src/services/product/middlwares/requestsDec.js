const Logger = require('../../Logger.js')

/*
  {

  }
 */

async function decrementProductRequests(Product, detailes, next, reject) {
  try{
    Product.requests --;

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