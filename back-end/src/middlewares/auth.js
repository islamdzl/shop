
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const EHandler = require('../services/EHandler/index')
const Tokens = require('../utils/tokens')

const User = require('../models/user.model')

exports.authorizeRoles = (...roles) =>{
    return ( req, res ,next)=>{
        
        if(! roles.includes( req.user.role)){
          EHandler.URError(res, EHandler.ERRORS.FORBIDDEN)
          return;
        }

        req.role = req.user.role
        next();
    }
}

exports.isAuthenticated = async (req, res, next) => {

  try {
    const token = req.cookies.token;

    if (! token) {
      res.redirect('/login')
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select('-password').select('-ratings');
    if (!user) {
      EHandler.URError(res, EHandler.ERRORS.ACCOUNT_NOT_AVAILABLE)
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.redirect('/login')
  }
};

exports.getUser = async (req, res, next) => {

  try {
    const token = req.cookies.token;

    if (! token) {
      res.redirect('/login')
      return
    }

    const projections = {
      _id: 1,
      email: 1,
      name: 1,
      username: 1,
      picture: 1,
    }

    const payload = await Tokens.verify(token)

    const user = await User.findById(payload._id, projections);
    if (! user) {
      EHandler.URError(res, EHandler.ERRORS.ACCOUNT_NOT_AVAILABLE)
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.redirect('/login')
  }
};



exports.ratLimit = (requests, TimeMinuts = 1, message)=> {
  limiter = rateLimit({
    windowMs: TimeMinuts * 1000,
    max: requests,
    message: {
      error: message || 'Over Requests'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
  return limiter;
}