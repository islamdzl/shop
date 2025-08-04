const mongoose = require('mongoose');
const { SchemaTypes } = mongoose;
const StoreMeddlwares = require('../middlewares/store/index')

const storeSchema = new mongoose.Schema({
  _id: {
    type: SchemaTypes.ObjectId,
    required: true,
  },

  productList: { type: SchemaTypes.ObjectId, default: [] },

  requests: { type: SchemaTypes.Mixed, default: []},

  logo: { type: SchemaTypes.String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
  name: { type: SchemaTypes.String, required: true },
  description: { type: SchemaTypes.String, default: 'No description provided' },
  categories: [{ type: SchemaTypes.String, default: 'General' }],

  location: {
    country: { type: SchemaTypes.Int32, default: 0 },
    city: { type: SchemaTypes.String, default: 'Algiers' },
    address: { type: SchemaTypes.String, default: 'No address provided' }
  },

  contact: {
    phone: { type: SchemaTypes.String, default: 'No phone number provided' },
    email: { type: SchemaTypes.String, default: 'No email provided' }
  },

  socialLinks: {
    facebook: { type: SchemaTypes.String, default: 'No Facebook link provided' },
    instagram: { type: SchemaTypes.String, default: 'No Instagram link provided' },
    twitter: { type: SchemaTypes.String, default: 'No Twitter link provided' }
  },

  ratings: {
    average: { type: SchemaTypes.Number, default: 50 },
    count: { type: SchemaTypes.Number, default: 0 },
    sum: { type: SchemaTypes.Number, default: 0 }
  },

  isVerified: { type: SchemaTypes.Boolean, default: false },
  isOpen: { type: SchemaTypes.Boolean, default: true },
  isActive: { type: SchemaTypes.Boolean, default: true },
  
}, {
  timestamps: true
})

storeSchema.pre('save', StoreMeddlwares.ChangeValue)
storeSchema.pre('updateOne', StoreMeddlwares.ChangeValue)

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;