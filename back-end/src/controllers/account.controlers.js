const Account = require('../models/account.model')
const Utils = require('../utils/index')
const Validation = require('../validations/index')

exports.login = async(req, res)=>{
  try {
    const data = req.body;

    const validation = Validation.AccountValidate.login(data)

    if (! validation.valid) {
      res.status(400).json({
        errors: validation.errors
      })
      return;
    }

    const account = await Account.findOne({
      $or:[
        {email: data.email},
        {username: data.username},
      ]
    })

    if (! account) {
      res.status(401).end()
      return
    }
    
    const isMatch = await Utils.Hash.compare(account.password, data.password);
    if (! isMatch) {
      res.status(400).end()
      return;
    } 

    const token =  Utils.Token.createToken({
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
    res.status(500).end()
  }
};

exports.register = async(req, res)=> {
  try {
    const data = req.body;

    if (await Account.findOne({
      $or: [
        {email: data.email},
        {username: data.username}
      ]
    }, {_id: 1})) {
      res.status(409).end()
      return;
    }

    const validate = Validation.AccountValidate.register(data)

    if (! validate.valid) {
      res.status(400).json({
        errors: validate.errors,
      })
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
    res.status(500).end()
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
  try {
    const { accountType } = req.body;
    const user = req.user;

    if (!accountType || !['admin', 'client', 'seller'].includes(accountType)) {
      res.status(400).end();
      return;
    }
    await Account.updateOne({
      _id: user._id
    }, {
      accountType
    })
    res.status(200).end();

  } catch (error) {
    res.status(500).end();
  }
}