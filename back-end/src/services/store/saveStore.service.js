const Store = require('../../models/store.model')
const Logger = require('../Logger')

module.exports = async(newStore, _id)=> {
  const storeId = _id ? _id : newStore._id;

  delete newStore._id;
  delete newStore.createdAt;

  try {

    if (! storeId) throw new Error('Invalid _id Store!');
    if (! newStore || typeof newStore != 'object') throw new Error('Invalid Store Object');
    
    const updateStatu = await Store.updateOne(
      {_id: storeId},
      {$set: newStore},
    )
    
    if (updateStatu.modifiedCount === 0) return false;
    return true;

  } catch(error) {

    Logger.error({
      message: `Error In Save New Store: ${error.message}`,
      storeId: storeId,
      stack: error.stack
    })
    
    return false;
  }
}