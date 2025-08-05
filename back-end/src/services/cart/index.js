const model = require('../../models/cart.model')
const middlware = require('../../utils/middlware')

exports.MidllwaresUseger = (_id, detailes, ...middlwares)=> middlware(model, _id, detailes, middlwares)

exports.Midllwares = {
  buyingAddProduct: require('./meddlwares/buyingAddProduct.service'),
  buyingRemoveProduct: require('./meddlwares/buyingAddProduct.service'),
  cartAddProduct: require('./meddlwares/cartAddProduct.service'),
  cartRemoveProduct: require('./meddlwares/cartRemoveProduct.service'),
  successAddProduct: require('./meddlwares/successAddProduct.service'),
  successRemoveProduct: require('./meddlwares/successRemoveProduct.service'),
}


exports.Services = require('./services')
exports.CreateObjects = require('./create.Objects')

exports.getCartById = require('./getCart.service')
exports.seveCart = require('./saveCart.service')
