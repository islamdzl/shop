const mongoose = require('mongoose')
const { SchemaTypes } = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: SchemaTypes.String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: SchemaTypes.String,
  },
  picture: {type: SchemaTypes.String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'},
  name: {type: SchemaTypes.String},
  
  role: {type: SchemaTypes.String, default: 'client'},
  
  username: {
    type: SchemaTypes.String, 
    default: null
  },

  ratings: {
    type: SchemaTypes.Map
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User;