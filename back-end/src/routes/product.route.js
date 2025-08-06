const express = require('express');
const Validations = require('../validations/index')
const productController = require('../controllers/product.controller')

const Router = express.Router();

Router.post('/get', productController.getProduct)
Router.post('/bye', productController.BuyProduct)
Router.post('/create', Validations.UserAuthValidate.getUser, productController.createNew)
Router.post('/set/available', Validations.UserAuthValidate.getUser, productController.setAvailable)


module.exports = Router;