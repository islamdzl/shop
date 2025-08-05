const model = require('../../models/product.model')
const middlware = require('../../utils/middlware')

exports.MidllwaresUseger = (_id, detailes, ...midllwares)=> middlware(model, _id, detailes, midllwares)

exports.Midllwares = {
  requestEnc: require('./midllwares/requestsEnc'),
  requestDec: require('./midllwares/requestsDec'),
  updateDetailes: require('./midllwares/updateDetailes'),
  setStateAvailable: require('./midllwares/setStateAvailable'),
}


exports.createProduct = require('./create.service')
exports.deleteProduct = require('./delete.service')
exports.getProduct = require('./getProduct.service')