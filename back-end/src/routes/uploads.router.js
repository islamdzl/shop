const express = require('express');
const Validations = require('../validations/index')
const uploadsController = require('../controllers/uploads.controller')

const Router = express.Router();

Router.post('/create', Validations.UserAuthValidate.getUser, uploadsController.getNewPackageId)
Router.post('/reject', Validations.UserAuthValidate.getUser, uploadsController.rejectPackage)


module.exports = Router;