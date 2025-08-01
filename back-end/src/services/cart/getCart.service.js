const Cart = require('../../models/cart.model')
const Logger = require('../Logger')

module.exports = async(cartId, filter = undefined)=> {

  if (! cartId) {
    Logger.error({
      message: 'Invalid Cart Id { getCart }'
    })
  }

  try {

    const cart = await Cart.findOne({
      _id: cartId
    }, filter)

    return cart
  }catch (error) {

    Logger.error({
      message: `Error in get cart by id: ${cartId}`,
      error
    })

  }

}