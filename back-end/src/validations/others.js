const mongoose = require('mongoose')


exports.objectId = (objectId)=> {
  return mongoose.Types.ObjectId.isValid(objectId)
}