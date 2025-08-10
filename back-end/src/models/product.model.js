const mongoose = require('mongoose')
const { SchemaTypes } = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  },

  ownerId: {
    type: SchemaTypes.ObjectId,
    required: true
  },

  price: {
    type: SchemaTypes.Number,
    required: true
  },

  stack: {
    type: SchemaTypes.Number,
    default: 0
  },


  isAvailable: {
    type: SchemaTypes.Boolean,
    default: true,
  },

  description: {
    type: SchemaTypes.String,
    default: ''
  },

  imagesUrls: {
    type: [SchemaTypes.String],
    default: ['https://cdn-icons-png.flaticon.com/512/18809/18809093.png']
  },

  categories: {
    type: [SchemaTypes.String],
    required: true
  },

  delivery: {
    type: SchemaTypes.Number,
    default: null
  },

  requests: {
    type: SchemaTypes.Number,
    default: 0
  }
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;