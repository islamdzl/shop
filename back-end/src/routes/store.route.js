const express = require('express');
const Validations = require('../validations/index')
const storeController = require('../controllers/store.controller')

const Router = express.Router();

Router.post('/get', storeController.getStore)
Router.post('/get/myStore', Validations.UserAuthValidate.getUser, storeController.getMyStore)
Router.post('/set/activty', Validations.UserAuthValidate.getUser, storeController.setActivty)
Router.post('/set/rating', Validations.UserAuthValidate.getUser, storeController.addRating)
Router.post('/set/open', Validations.UserAuthValidate.getUser, storeController.setOpen)


module.exports = Router;