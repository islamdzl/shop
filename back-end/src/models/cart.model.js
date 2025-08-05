const mongoose = require('mongoose')
const { SchemaTypes } = require('mongoose')

const CartMiddlware = require('../middlewares/cart/index')

const cartSchema = new mongoose.Schema({

  buyingDetailes: {
    fullName: {type: SchemaTypes.String, default: ''},
    phone1: {type: SchemaTypes.String, default: ''},
    phone2: {type: SchemaTypes.String, default: ''},
    state: {type: SchemaTypes.Number, default: 0},
    city: {type: SchemaTypes.String, default: ''},
    description: {type: SchemaTypes.String, default: ''},
  },

  cart: {
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
  }

}, {
  timestamp: true
})

cartSchema.pre('save', CartMiddlware.ChangeValue)
cartSchema.pre('updateOne', CartMiddlware.ChangeValue)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;