const Uploads = require('../services/LDB/uploads.service')
const Logger = require('../services/Logger')
const EHandler = require('../services/EHandler/index')
const Utils = require('../services/LDB/utils')

exports.beforeUpload = async(req, res, next)=> {
  req.user = {
    _id: '6898e42fd7c22a890cbfa26b',
    role: 'client'
  }

  const user = req.user;

  try{
    const payload = await Utils.FindOne(Uploads, {_id: user._id})

    if (! payload) {
      const payload = {
        _id: user._id,
        files: []
      }
      await Utils.Insert(Uploads, payload)
    }

    next()
  }catch(error) {

    Logger.error({
      message: 'Error in before Upload Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}


exports.afterUpload = async(req, res)=> {

  const user = req.user;
  const fileName = req.fileName;

  try{

    const payload = await Utils.FindOne(Uploads, {_id: user._id})

    if (! payload || ! Array.isArray(payload.files)) {
      EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
      return;
    }

    const file = {
      name: fileName
    }

    payload.files.push(file)

    await Utils.Update(Uploads, {_id: user._id}, payload)

    res.status(200).json({file: fileName})
  }catch(error) {

    Logger.error({
      message: 'Error in after Upload Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}


exports.reject = async(req, res)=> {

  const user = req.user;

  try{

    const deleteds = await Utils.Delete(Uploads, {_id: user._id})

    res.status(200).json(!! deleteds)
  }catch(error) {

    Logger.error({
      message: 'Error in reject Upload Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}