const Logger = require('../../Logger')
const Validations = require('../../../validations/index')

/*
  objectRequest
*/

async function  addObjectRequest(Store, detailes, next, reject) {
  try {
    const objectRequestValidate = Validations.StoreValidate.request(detailes.objectRequest)

    if (! objectRequestValidate.valid) {
      reject(objectRequestValidate.errors)
      return;
    }

    if (!Array.isArray(Store.requests)) Store.requests = [];


    Store.requests.push(objectRequestValidate.value)

    next()
  } catch (error) {

    Logger.error({
      message: 'Error in addObjectRequest Store',
      error,
    });
    
    reject(error);
  }
}

addObjectRequest.required = {
  ratings: 1
}

module.exports = addObjectRequest;