const express = require('express');
const SettingsController = require('../controllers/settings.controller')
const Auth = require('../middlewares/auth')

const Router = express.Router();

const rateLimit = {
  updateBuyingDetailes: Auth.ratLimit(6, 1),
  get:                  Auth.ratLimit(6, 1),
}

Router.post('/get',                         rateLimit.get,                      Auth.getUser, SettingsController.get)
Router.post('/update/buyingDetailes',       rateLimit.updateBuyingDetailes,     Auth.getUser, SettingsController.updateBuyingDetailes)


module.exports = Router;