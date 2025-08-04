const Logger = require('../Logger')
const Purchase = require('../../models/purchase.model')
const mongoose = require('mongoose')


/*
  * Array of ObjectId
    [ {ObjectId} ]
*/
module.exports = async(purchsId)=> {
  try {
    
    if (! Array.isArray(purchsId) || purchsId.length === 0) {
      throw new Error('PurchsId is required')
    }
    
    const validPurchsID = purchsId.filter((id)=>  mongoose.Types.ObjectId.isValid(id))

    if (validPurchsID.length === 0) {
      throw new Error('No valid ObjectId in purchsId')
    }

    await Purchase.deleteMany({
      _id: { $in: validPurchsID }
    })

    return true;

  }catch(error) {

    Logger.error({
      message: 'Error in delete purchs',
      error
    })
  }

  return false;
};