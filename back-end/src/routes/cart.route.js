const express = require('express')
const cartController = require('../controllers/cart.controller')
const validations = require('../validations')

const Router = express.Router()

Router.post('/shoppingCart/add-item', validations.UserAuthValidate.getUser, cartController.shoppingCartAddProduct)
Router.post('/shoppingCart/remove-item', validations.UserAuthValidate.getUser, cartController.shoppingCartAddProduct)
Router.post('/shoppingCart/clear', validations.UserAuthValidate.getUser, cartController.clearShoppingCart)
Router.post('/success/clear', validations.UserAuthValidate.getUser, cartController.clearSuccess)
Router.post('/buyingDetailes/update', validations.UserAuthValidate.getUser, cartController.updateBuyingDetailes)
Router.post('/get', validations.UserAuthValidate.getUser, cartController.get)

module.exports = Router;