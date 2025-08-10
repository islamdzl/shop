const DataStore = require('nedb');
const DataStoreUseger = require('./db.useger');
const path = require('path')

const uploads = new DataStore({
  filename: path.join(__dirname, './datastore/uploads.db'),
  autoload: true,
})

module.exports = uploads;