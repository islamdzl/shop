const jwt = require('jsonwebtoken')
const ErrorHandler = require('../services/errorsHandler/index')

exports.getUser = async(req, res, next)=> {
    if (! req.cookies.token) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.ACCESS_TOKEN_REQUIRED)
      return;
    }

  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded)=> {

    if (err) {
      res.redirect('/login')
      return;
    }

    req.user = decoded;
    next()
  })
}
