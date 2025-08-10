const bcrypt = require('bcrypt')

const salt = 12;

exports.compare  = async(password, hashPassword)=> {
  return await bcrypt.compare(password, hashPassword)
}

exports.hash = async(text)=> {
  return new Promise((resolve, reject)=> {
    bcrypt.hash(text, salt, (error, hash)=> {

      if (error) {
        reject(error);
        return;
      }

      resolve(hash)
    })
  })
}