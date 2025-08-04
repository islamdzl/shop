const Validation = require('../../validations/index.js')

exports.shoppingCart = (data)=> {
  return Validation.CartValidate.shoppingCart(data)
}

exports.buying = (data)=> {
  return Validation.CartValidate.buying(data)
}

exports.success = (data)=> {
  return Validation.CartValidate.success(data)
}