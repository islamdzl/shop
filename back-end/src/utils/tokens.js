const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'CUSTOM_SECRET_KEY'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

exports.createNew = (userID)=> {
  return jwt.sign({_id: userID}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
}

exports.verify = (token)=> {
  return new Promise((resolve, reject)=> {

    jwt.verify(token, JWT_SECRET, (error, payload)=> {

      if (error) {
        reject(error)
        return;
      }

      resolve(payload)
    })
  })
}

exports.responseOnCookie = (res, token)=> {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict', 
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}