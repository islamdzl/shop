

exports.ERRORS = require('./errors.json')


exports.useResponseError = (res, error)=> {
  res.status(error.code)
  res.json({
    error: error.message
  })
}