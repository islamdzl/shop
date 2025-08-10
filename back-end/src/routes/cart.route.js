const express = require('express')
const cartController = require('../controllers/cart.controller')
const Auth = require('../middlewares/auth')
const Router = express.Router()


const rateLimit = {
  shoppingCartAddProduct: Auth.ratLimit(30, 1),
  shoppingCartremoveProduct: Auth.ratLimit(90, 1),
  clearShoppingCart: Auth.ratLimit(6, 1),
  clearSuccess: Auth.ratLimit(6, 1),
  get: Auth.ratLimit(5, 1),
}


Router.post('/shoppingCart/addProduct',     rateLimit.shoppingCartAddProduct,      Auth.getUser, cartController.shoppingCartAddProduct)
Router.post('/shoppingCart/removeProduct',  rateLimit.shoppingCartremoveProduct,   Auth.getUser, cartController.shoppingCartremoveProduct)
Router.post('/shoppingCart/clear',          rateLimit.clearShoppingCart,           Auth.getUser, cartController.clearShoppingCart)
Router.post('/success/clear',               rateLimit.clearSuccess,                Auth.getUser, cartController.clearSuccess)
Router.post('/get',                         rateLimit.get,                         Auth.getUser, cartController.get)

module.exports = Router;