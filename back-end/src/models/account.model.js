const mongoose = require('mongoose')
const { SchemaTypes } = require('mongoose')
const AccountMeddlwares = require('../middlewares/account/index')

const accountSchema = new mongoose.Schema({
  email: {
    type: SchemaTypes.String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: SchemaTypes.String,
  },
  picture: {type: SchemaTypes.String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'},
  name: {type: SchemaTypes.String},
  
  accountType: {type: SchemaTypes.String, enum: ['admin', 'client', 'seller'], default: 'client'},
  
  username: {
    type: SchemaTypes.String, 
    default: null
  },
  
  store: {
    type: SchemaTypes.ObjectId,
    ref: 'Store',
    default: null
  },

  cart: {
    type: SchemaTypes.ObjectId,
    ref: 'Cart',
    default: null
  },
}, {
  timestamps: true
})

accountSchema.pre('save', AccountMeddlwares.ChangeValue)
accountSchema.pre('updateOne', AccountMeddlwares.ChangeValue)

const Account = mongoose.model('Account', accountSchema)

module.exports = Account;