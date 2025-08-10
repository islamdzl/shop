const mongoose = require('mongoose')
const { SchemaTypes } = require('mongoose')

const settingsSchema = new mongoose.Schema({
  theme: {
    type: SchemaTypes.String,
    default: 'light'
  },

  buyingDetailes: {
    type: {},
    default: null
  },

  language: {
    type: SchemaTypes.String,
    default: 'ar'
  },

  notifications: {
    email: { type: SchemaTypes.Boolean, default: true },
    sms: { type: SchemaTypes.Boolean, default: false }
  }
})

const Settings = mongoose.model('Settings', settingsSchema)

module.exports = Settings;