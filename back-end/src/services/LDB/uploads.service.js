const DataStore = require('nedb');
const DataStoreUseger = require('./db.useger');
const path = require('path')

const uploads = new DataStore({
  filename: path.join(__dirname, './datastore/uploads.db'),
  autoload: true,
})

const Middlwares = {
  insert: (data, next, cancel)=> {next()},
  update: (data, next, cancel)=> {next()},
  remove: (data, next, cancel)=> {next()},
  findOne: (condition, next, cancel)=> {next()},
  find: (data, next, cancel)=> {next()},
}
exports.Middlwares = Middlwares

exports.exist = (...args)=> DataStoreUseger.exist(uploads, ...args)
exports.insert = (...args)=> DataStoreUseger.insert(uploads, Middlwares.insert, ...args)
exports.update = (...args)=> DataStoreUseger.update(uploads, Middlwares.update, ...args)
exports.remove = (...args)=> DataStoreUseger.remove(uploads, Middlwares.remove, ...args)
exports.findOne = (...args)=> DataStoreUseger.findOne(uploads, Middlwares.findOne,...args)
exports.find = (...args)=> DataStoreUseger.find(uploads, Middlwares.find,...args)


exports.Model = uploads;