const Account = require('../models/account.model')
const Utils = require('../utils/index')
const Validations = require('../validations/index')
const ErrorHandler = require('../services/errorsHandler/index');
const Logger = require('../services/Logger');

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

    const validation = Validations.AccountValidate.login(data)

    if (! validation.valid) {
      res.status(400).json({
        errors: validation.errors
      })
      return;
    }

    const account = await Account.findOne({
      email: data.email,
      username: data.username,
    })

    if (! account) {
      res.status(401).end()
      return
    }
    
    const isMatch = await Utils.Hash.compare(data.password, account.password);
    
    if (! isMatch) {
      res.status(400).end()
      return;
    } 

    const token =  await Utils.Token.createToken({
      _id: account._id,
      email: account.email,
      username: account.username,
      accountType: account.accountType,
    })


    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict', 
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const response =  Utils.BuyildResponse.login(account)

    res.status(200).json(response)
  }catch (error) {

    Logger.error({
      message: 'Error in login Controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
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

    const validate = Validations.AccountValidate.register(data)

    if (! validate.valid) {
      res.status(400).json({
        errors: validate.errors,
      })
      return;
    }

    if (await Account.findOne({
      $or: [
        {email: data.email},
        {username: data.username}
      ]
    }, {_id: 1})) {
      res.status(409).end()
      return;
    }

    const account = new Account(validate.value)
    await account.save()
    const token = await Utils.Token.createToken({
      _id: account._id,
      email: account.email,
      username: account.username,
      accountType: account.accountType,
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict', 
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const response = Utils.BuyildResponse.register(account)

    res.status(200).json(response)
  }catch (error) {

    Logger.error({
      message: 'Error in register Controller',
      error
    })
    
    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
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

exports.changeAccountType = async(req, res) => {

  /*
    {
      accountType: 'admin' | 'client' | 'seller'
    }
  */
  try {
    const { accountType } = req.body;
    const user = req.user;

    if (!accountType || !['admin', 'client', 'seller'].includes(accountType)) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_DATA)
      return;
    }

    const projections = {
      accountType: 1
    }

    const account = await Account.findOne({_id: user._id}, projections)

    if (! account) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.ACCOUNT_NOT_AVAILABLE)
      return;
    }

    account.accountType = accountType;

    await Account.updateOne({_id: user._id}, account)

    res.status(200).end();

  } catch (error) {

    Logger.error({
      message: 'Error in changeType Controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
  }
}