const { v4: uuidv4 } = require('uuid')


exports.generateUuid = (length = null)=> {
  const uuid = uuidv4()
  return uuid.slice(0, length ? length : uuid.length)
}