const mongoose = require('mongoose')
const { SchemaTypes } = require('mongoose')

const SettingsMidllware = require('../middlewares/settings/index')

const settingsSchema = new mongoose.Schema({
  theme: {
    type: SchemaTypes.String,
    default: 'light'
  },

  delivery: {
    toHouse: {type: SchemaTypes.Boolean, default: false},
    state: {type: SchemaTypes.Int32, default: null},
    city:  {type: SchemaTypes.String}
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

settingsSchema.pre('save', SettingsMidllware.ChangeValue)
settingsSchema.pre('updateOne', SettingsMidllware.ChangeValue)

const Settings = mongoose.model('Settings', settingsSchema)

module.exports = Settings;