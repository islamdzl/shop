const mongoose = require('mongoose')
const { SchemaTypes }= require('mongoose')

const purchaseSchema = new mongoose.Schema({

  productId: {type: SchemaTypes.ObjectId},

  clientId: {type: SchemaTypes.ObjectId},

  count: {type: SchemaTypes.Number},

  unitPrice: {type: SchemaTypes.Number}
}, {
  timestamps: true
})

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;