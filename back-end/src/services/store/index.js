const model = require('../../models/store.model.js')
const middlware = require('../../utils/middlware')

exports.MidllwaresUseger = (_id, detailes, ...middlwares)=> middlware(model, _id, detailes, middlwares)

exports.Middlewares = {
  changeRatings: require('./middlwares/changeRatings.service.js'),
  createProduct: require('./middlwares/createProduct.service.js'),
  deleteproduct: require('./middlwares/deleteProduct.service.js'),
  updateDetailes: require('./middlwares/updateDetailes.service.js'),
  addRequest: require('./middlwares/addRequest.service.js')
}

exports.getStore = require('./getStore.service')
exports.saveStore = require('./saveStore.service')

exports.Services = require('./services.js')

exports.createObjectRequest = require('./crate.ObjectRequest.js')