const express = require('express');
const productController = require('../controllers/product.controller')
const Auth = require('../middlewares/auth')

const Router = express.Router();

Router.post('/get', productController.getProduct)
Router.post('/bye', productController.BuyProduct)
Router.post('/create', Auth.getUser, productController.createNew)
Router.post('/set/available', Auth.getUser, productController.setAvailable)


module.exports = Router;