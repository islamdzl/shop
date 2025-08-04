
exports.Middlewares = {
  changeRatings: require('./middlwares/changeRatings.service.js'),
  createProduct: require('./middlwares/createProduct.service.js'),
  deleteproduct: require('./middlwares/deleteProduct.service.js'),
  updateDetailes: require('./middlwares/updateDetailes.service.js')
}

exports.getStore = require('./getStore.service')
exports.saveStore = require('./saveStore.service')

exports.Services = require('./services.js')

exports.createObjectRequest = require('./crate.ObjectRequest.js')