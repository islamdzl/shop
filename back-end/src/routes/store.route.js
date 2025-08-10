const express = require('express');
const storeController = require('../controllers/store.controller')
const Auth = require('../middlewares/auth')
const Router = express.Router();

Router.post('/get',         storeController.getStore)
Router.post('/get/myStore', Auth.getUser, storeController.getMyStore)
Router.post('/set/activty', Auth.getUser, storeController.setActivty)
Router.post('/set/open',    Auth.getUser, storeController.setOpen)


module.exports = Router;