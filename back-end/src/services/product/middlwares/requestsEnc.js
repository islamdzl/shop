const Logger = require('../../Logger.js')

/*
  {

  }
 */

async function encrementProductRequests(Product, detailes, next, reject) {
  try{
    Product.requests ++;

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