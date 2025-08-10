const mongoose = require('mongoose')
const { SchemaTypes } = require('mongoose')


const cartSchema = new mongoose.Schema({

  ratings: {type: SchemaTypes.Map},

  shoppingCart: {
    type: SchemaTypes.Mixed,
    default: []
  },
  
  buying: {
    type: SchemaTypes.Mixed,
    default: []
  },
  
  success: {
    type: SchemaTypes.Mixed,
    default: []
  },

}, {
  timestamp: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;