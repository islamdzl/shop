const Validations = require('../../../validations/index.js')
const Logger = require('../../Logger.js')
const Utils = require('../../../utils/index.js')

/*
  {
    isAvailable: <BOOLEAN>
  }
 */

async function setProductStateAvailable(Product, detailes, next, reject) {

  try {

    if (typeof detailes.isAvailable != 'boolean') {
      throw new Error('isAvailable is required')
    }

    Product.isAvailable = detailes.isAvailable;
    
    next()
  }catch(error) {

    Logger.error({
      message: 'Error in update product detailes',
      error
    })

    reject(error);
  }
}

setProductStateAvailable.required = {
  isAvailable: 1,
}

module.exports = setProductStateAvailable