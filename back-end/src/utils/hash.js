const bcript = require('bcrypt')

const saltRounds = 12;

exports.hash = async(text)=> {
  return await bcript.hash(text, saltRounds)
}

exports.compare = async(userPassword, dbPasswordHash)=> {
  return await bcript.compare(userPassword, dbPasswordHash)
}