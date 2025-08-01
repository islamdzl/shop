const Cart = require('../../models/cart.model')
const Logger = require('../Logger')

module.exports = async(newCart, _id)=> {
  const cartId = _id ? _id : newCart._id;

  delete newCart._id;
  delete newCart.createdAt;

  try {

    if (! cartId) throw new Error('Invalid _id Cart!');
    if (! newCart || typeof newCart != 'object') throw new Error('Invalid Cart Object');
    
    const updateStatu = await Cart.updateOne(
      {_id: cartId},
      {$set: newCart},
    )
    
    if (updateStatu.modifiedCount === 0) return false;
    return true;

  } catch(error) {

    Logger.error({
      message: `Error In Save New Cart: ${error.message}`,
      cartId: cartId,
      stack: error.stack
    })
    
    return false;
  }
}