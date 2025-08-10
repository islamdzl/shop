const Logger = require('../services/Logger');
const EHandler = require('../services/EHandler')
const Validations = require('../validations');
const Settings = require('../models/settings.model')


exports.updateBuyingDetailes = async(req, res)=> {

  /*
    {
      fullName: joi.string().required().trim().min(7),
      state: joi.number().min(1).max(58).required(),
      city: joi.string().required().min(4).trim(),
      phone1: joi.string().min(8).max(11).trim().required(),
      phone2: joi.string().min(8).max(11).trim(),
      description: joi.string().max(70).trim(),
      deliveryToHome: joi.boolean().default(false)
    }
  */

  const { user } = req;
  const data = req.body;

  try{

    
    const { error, value } = Validations.Settings.updateBuyingDetailes(data)
    
    if (error) {
      EHandler.UCRError(res, error)
      return;
    }
    
    const updatedSettings = await Settings.findOneAndUpdate(
      {_id: user._id},
      {buyingDetailes: value},
      {new: true, projection: {buyingDetailes: 1}}
    )

    res.status(200).json({buyingDetailes: updatedSettings.buyingDetailes})
  }catch(error) {

    Logger.error({
      message: 'Error in updateDetailes Controller Settings',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}

exports.get = async(req, res)=> {

  /*
    {}
  */

  const user = req.user;
  const data = req.body;

  try{

    const settings = await Settings.findById(user._id)

    res.status(200).json(settings)
  }catch(error) {

    Logger.error({
      message: 'Error in get Settings Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}