const LocalDB = require('../localDb/index')
const ErrorHandler = require('../services/errorsHandler/index')

exports.before = (req, res, next)=> {
  req.user = {
    _id: "68927875df43d598dca48821"
  }
  const { packageId } = req.params
  
  if (! packageId) {
    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_PACKAGE)
    return;
  }

  LocalDB.Uploads.exist({packageId}, async(isExist)=> {

    if (! isExist) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_PACKAGE)
      return;
    }
    next()
  })
}

exports.after = async(req, res)=> {

  const { packageId } = req.params

  await LocalDB.Uploads.pushFileInWaiting(packageId, req.uniqueName)

  res.json({
    success: true,
    fileName: req.uniqueName
  })
}