const jwt = require('jsonwebtoken');

exports.createToken = (payload, expiresIn) => {

  return new Promise((resolve, reject) => {

    if (! expiresIn) expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

exports.verifyToken = (token) => {

  return new Promise((resolve, reject) => {

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });

  });
}