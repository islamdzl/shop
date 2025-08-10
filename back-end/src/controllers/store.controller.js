const Logger = require('../services/Logger');
const EHandler = require('../services/EHandler')
const Validations = require('../validations')

const Store = require('../models/store.model')

exports.getMyStore = async(req, res)=> {

  /*
    {}
  */

  const user = req.user;
  const data = req.body;

  try{

    const projections = {
      requests: 0
    }

    const store = await Store.findById(user._id, projections)

    res.status(200).json(store)
  }catch(error) {

    Logger.error({
      message: 'Error in getStore Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}



exports.getStore = async(req, res)=> {

  /*
    user not required

    {
      storeId: {objectId}
    }
  */

  const user = req.user;
  const data = req.body;

  try{

    const { error, value } = Validations.Store.getStore(data)

    if (error) {
      EHandler.UCRError(res, error)
      return;
    }

    const projections = {
      logo: 1,
      name: 1,
      productList: 1,
      description: 1,
      categories: 1,
      location: 1,
      contact: 1,
      socialLinks: 1,
      ratings: 1,
      isVerified: 1,
      isOpen: 1,
      isActive: 1,
    }

    const store = await Store.findById(value.storeId, projections)

    if (! store) {
      EHandler.URError(res, EHandler.ERRORS.INVALID_STORE)
      return;
    }

    res.status(200).json(store)
  }catch(error) {

    Logger.error({
      message: 'Error in getStore Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}


exports.setActivty = async(req, res)=> {

  /*
    {
      activty: Boolean
    }
  */
  const data = req.body;
  const user = req.user;

  try{

    const { error, value } = Validations.Store.setActivty(data)

    if (error) {
      EHandler.UCRError(res, error)
      return;
    }

    const store = await Store.findByIdAndUpdate(user._id,
      {isActive: value.activty},
      {new: true, projection: {isActive: 1}}
    )

    res.status(200).json({isActive: store.isActive})
  }catch(error) {

    Logger.error({
      message: 'Error in setActivty Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}


exports.setOpen = async(req, res)=> {

  /*
    {
      open: Boolean
    }
  */
  const data = req.body;
  const user = req.user;

  try{

    const { error, value } = Validations.Store.setOpen(data)

    if (error) {
      EHandler.URError(res, error)
      return;
    }

    const storeUpdated = await Store.findByIdAndUpdate(user._id,
      {isOpen: value.open},
      {new: true, projection: {isOpen: 1}}
    )

    res.status(200).json({isOpen: storeUpdated.isOpen})
  }catch(error) {

    Logger.error({
      message: 'Error in setOpen Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}