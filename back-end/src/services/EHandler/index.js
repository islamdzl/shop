

exports.ERRORS = require('./errors.json')


exports.URError = (res, error)=> {
  res.status(error.code)
  res.json({
    error: error.message
  })
}

exports.UCRError = (res, error)=> {
  res.status(400)
  res.json({
    error: error
  })
}