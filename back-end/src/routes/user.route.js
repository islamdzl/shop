const express = require('express')
const Router = express.Router();
const userControlers = require('../controllers/user.controlers.js')
const Auth = require('../middlewares/auth.js')

Router.post('/register', userControlers.register)
Router.post('/login', userControlers.login)
Router.post('/logout', userControlers.logout)
Router.post('/account/changeType', Auth.getUser, userControlers.changeRole)

module.exports = Router;