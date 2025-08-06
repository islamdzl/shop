const LocalDB = require('../localDb/index')
const Logger = require('../services/Logger')
const ErrorHandler = require('../services/errorsHandler/index')

exports.getNewPackageId = async(req, res)=> {
  /*
    {}
  */

  const data = req.body;
  const user = req.user;

  try{

    LocalDB.Uploads.exist({userId: user._id}, async(isExist)=>{
      if (isExist) {

        const package = await LocalDB.Uploads.findOne({userId: user._id})

        res.status(200).json({
          packageId: package.packageId
        })
        return;
      }

      const newPackageId = LocalDB.Uploads.generatePackageId(user._id);

      res.status(200).json({
        packageId: newPackageId
      })

    });

  }catch(error) {

    Logger.error({
      message: 'Error in uploads Controller' + error,
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
  }
}

exports.rejectPackage = async(req, res)=> {
  /*
    {}
  */

  const data = req.body;
  const user = req.user;

  try{

    LocalDB.Uploads.exist({userId: user._id}, async(isExist)=> {
      if (! isExist) {
        ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_PACKAGE);
        return;
      }

      const package = await LocalDB.Uploads.findOne({userId: user._id})
      
      await LocalDB.Uploads.rejectFiles(package.packageId);

      res.status(200).end()
    })
  }catch(error) {

    Logger.error({
      message: 'Error in uploads Controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
  }
}