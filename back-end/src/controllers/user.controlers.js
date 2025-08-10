const Tokens = require('../utils/tokens')
const Hash = require('../utils/hash')
const Validations = require('../validations/index')
const EHandler = require('../services/EHandler/index');
const Logger = require('../services/Logger');

const User = require('../models/user.model')
const Store = require('../models/store.model')
const Cart = require('../models/cart.model')
const Settings = require('../models/settings.model')

exports.login = async(req, res)=>{

  /*
    {
      username: joi.string().min(3).max(10),
      email: joi.string().email(),
      password: joi.string().required()
    }
  */

  try {
    const data = req.body;

    const { error, value } = Validations.User.login(data)

    if (error) {
      EHandler.UCRError(res, error)
      return;
    }

    const filter = {}
    value.email ? filter.email = value.email : filter.username = value.username

    const account = await User.findOne(filter)

    if (! account) {
      EHandler.URError(res, EHandler.ERRORS.ACCOUNT_NOT_AVAILABLE)
      return
    }
    
    const isMatch = await Hash.compare(value.password, account.password);
    
    if (! isMatch) {
      EHandler.URError(res, EHandler.ERRORS.ACCOUNT_NOT_AVAILABLE)
      return;
    } 

    const token = Tokens.createNew(account._id)

    Tokens.responseOnCookie(res, token)

    const response =  account.toJSON()

    delete response.password;
    
    response.token = token;
    res.status(200).json(response)
  }catch (error) {

    Logger.error({
      message: 'Error in login Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
};

exports.register = async(req, res)=> {

  /*
    {
      username: joi.string().min(3).max(10),
      email: joi.string().email(),
      password: joi.string().required()
    }
  */

  try {
    const data = req.body;

    const { error, value } = Validations.User.register(data)

    if (error) {
      EHandler.UCRError(res, error)
      return;
    }

    const filter = {}

    data.email ? filter.email = data.email : filter.username = data.username

    if (await User.findOne(filter, {_id: 1})) {
      EHandler.URError(res, EHandler.ERRORS.ACCOUNT_ALREADY_EXIST)
      return;
    }

    value.password = await Hash.hash(value.password)
    const storeName = value.username ? value.username: value.email.slice(0, value.email.indexOf('@'))
    const account = new User(value)
    await new Store({_id: account._id, name: storeName}).save()
    await new Cart({_id: account._id}).save()
    await new Settings({_id: account._id}).save()
    await account.save();

    const token = Tokens.createNew(account._id)

    Tokens.responseOnCookie(res, token)

    const response = account.toJSON()

    delete response.password;

    response.token = token;
    res.status(200).json(response)
  }catch (error) {
    console.log(error)

    Logger.error({
      message: 'Error in register Controller',
      error
    })
    
    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}

exports.logout = (req, res) => {

  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });

  res.status(200).end();
}

exports.changeRole = async(req, res) => {

  /*
    {
      role: 'admin' | 'client' | 'seller'
    }
  */
  try {
    const data = req.body;
    const user = req.user;

    const { error, value } = Validations.User.changeRole(data)
    if (error) {
      EHandler.UCRError(res, error)
      return;
    }

    if (value.role === user.role) {
      EHandler.URError(res, EHandler.ERRORS.ALREADY_UPDATED)
      return;
    }

    const updatedUser = await User.findOneAndUpdate(
      {_id: user._id}, 
      {role: value.role},
      {new: true, projection: {role: 1}}
    )

    if (! updatedUser) {
      EHandler.URError(res, EHandler.ERRORS.ACCOUNT_NOT_AVAILABLE)
      return;
    }

    res.status(200).json({role: updatedUser.role});
  } catch (error) {

    Logger.error({
      message: 'Error in changeType Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}