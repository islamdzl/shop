const Store = require('../../models/store.model')
const Logger = require('../Logger')

module.exports = async(storeId, filter = undefined)=> {

  if (! storeId) {
    Logger.error({
      message: 'Invalid Store Id { getStore }'
    })
  }

  try {

    const store = await Store.findOne({
      _id: storeId
    }, filter)

    return store
  }catch (error) {

    Logger.error({
      message: `Error in getStore Sevice: ${storeId}`,
      error
    })

  }

}