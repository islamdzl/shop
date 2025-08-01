const express = require('express')
const Router = express.Router();
const accountControlers = require('../controllers/account.controlers.js')
const validations = require('../validations/index.js')

Router.post('/register', accountControlers.register)
Router.post('/login', accountControlers.login)
Router.post('/logout', accountControlers.logout)
Router.patch('account-type', validations.UserAuthValidate.getUser, accountControlers.changeAccountType)

module.exports = Router;