const mongoose = require('mongoose')
const { SchemaTypes } = require('mongoose')

const ProductMiddlware = require('../middlewares/product/index')
const { required } = require('../services/store/middlwares/createProduct.service')

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

  isAvailable: {
    type: SchemaTypes.Boolean,
    default: true,
  },

  description: {
    type: SchemaTypes.String,
    default: ''
  },

  imageUrl: {
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

productSchema.pre('save', ProductMiddlware.ChangeValue)
productSchema.pre('updateOne', ProductMiddlware.ChangeValue)

const Product = mongoose.model('Product', productSchema)

module.exports = Product;