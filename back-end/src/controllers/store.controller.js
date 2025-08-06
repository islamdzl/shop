const Logger = require('../services/Logger');
const ErrorHandler = require('../services/errorsHandler/index')
const Validations = require('../validations')
const StoreService = require('../services/store/index')


exports.getMyStore = async(req, res)=> {

  /*
    {}
  */

  const user = req.user;
  const data = req.body;

  try{

    const projections = {}

    const store = await StoreService.getStore(user._id, projections)

    if (! store) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_STORE)
      return;
    }

    res.status(200).json(store)
  }catch(error) {

    Logger.error({
      message: 'Error in getStore Controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
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


    if (! data || ! Validations.Others.objectId(data.storeId)) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_STORE_ID)
      return;
    }

    const projections = {
      name: 1,
      logo: 1,
      productList: 1,
      location: 1,
      contact: 1,
      socialLinks: 1,
      ratings: 1,
      isVerified: 1,
      isOpen: 1,
      description: 1,
      categories: 1,
      isActive: 1,
      createdAt: 1,
      updatedAt: 1
    }

    const store = await StoreService.getStore(data.storeId, projections)

    if (! store) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_STORE)
      return;
    }

    res.status(200).json(store)
  }catch(error) {

    Logger.error({
      message: 'Error in getStore Controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
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

    if (! data || typeof data.activty !== 'boolean') {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_DATA)
      return;
    }

    const projections = {
      isActive: 1
    }

    const store = await StoreService.getStore(user._id, projections)

    store.isActive = data.activty;

    await StoreService.saveStore(store, user._id)

    res.status(200).end()
  }catch(error) {

    Logger.error({
      message: 'Error in setActivty Controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
  }
}

exports.addRating = async(req, res)=> {

  /*
    {
      storId: {objectId}
      rating: 1 | 0 | -1 
    }
  */

  const data = req.body;
  const user = req.user;

  try{

    if (! data || ! Validations.Others.objectId(data.storeId)) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_STORE_ID)
      return;
    }

    if (! Number.isInteger(data.rating) || ! (data.rating >= -1 && data.rating <= 1)) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_DATA)
      return;
    }

    const options = {
      rating: data.rating
    }

    await StoreService.MidllwaresUseger(data.storeId, options, StoreService.Midllewares.changeRatings)

    res.status(200).end()
  }catch(error) {

    Logger.error({
      message: 'Error in addRating controller',
      error
    })

    Logger.error({
      message: error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
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

    if (! data || typeof data.open !== 'boolean') {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_DATA)
      return;
    }

    const projections = {
      isOpen: 1
    }

    const store = await StoreService.getStore(user._id, projections)

    store.isOpen = data.open;

    await StoreService.saveStore(store, user._id)

    res.status(200).end()
  }catch(error) {

    Logger.error({
      message: 'Error in setOpen Controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
  }
}