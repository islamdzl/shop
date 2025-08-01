const jwt = require('jsonwebtoken')

exports.getUser = async(req, res, next)=> {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded)=> {

    if (err) {
      res.status(401).end()
      return;
    }
    req.user = decoded;
    next()
  })
}
