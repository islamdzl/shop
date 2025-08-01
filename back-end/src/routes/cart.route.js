const express = require('express')
const cartController = require('../controllers/cart.controller')
const validations = require('../validations')

const Router = express.Router()

Router.post('add-item', validations.UserAuthValidate.getUser, cartController.addItem)

module.exports = Router;