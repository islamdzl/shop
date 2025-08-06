const DataStore = require('nedb');
const DataStoreUseger = require('./db.useger');
const Validations = require('../validations/index');
const Utils = require('../utils/index');
const Logger = require('../services/Logger');
const path = require('path');

const categoris = new DataStore({
  filename: path.join(__dirname, './datastore/categoris.db'),
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

exports.insert = (...args)=> DataStoreUseger.insert(categoris, Middlwares.insert, ...args)
exports.update = (...args)=> DataStoreUseger.update(categoris, Middlwares.update, ...args)
exports.remove = (...args)=> DataStoreUseger.remove(categoris, Middlwares.remove, ...args)
exports.findOne = (...args)=> DataStoreUseger.findOne(categoris, Middlwares.findOne,...args)
exports.find = (...args)=> DataStoreUseger.find(categoris, Middlwares.find,...args)


exports.createNew = async(name)=> {
  
  const categori = {
    ref: Utils.Uuid.generateUuid(5),
    name
  }

  const validate = Validations.LocalDb.categori(categori);
  if (! validate) return false;

  return exports.insert(validate)
}

exports.updateName = async(ref, name)=> {
  
  return exports.update({ref}, {name})
}

exports.delete = (ref)=> {

  return exports.remove({ref})
}

exports.encrement = async(ref)=> {

  try {
    const categori = await exports.findOne({ref})

    categori.allProduct ++;

    await exports.update({ref}, categori);

    return true;
  }catch(error) {

    Logger.error({
      message: 'Error in Encrement Categori',
      error
    })

    return false;
  }
}

exports.decrement = async(ref)=> {
  
  try {
    const categori = await exports.findOne({ref})

    categori.allProduct ++;

    await exports.update({ref}, categori);

    return true;
  }catch(error) {

    Logger.error({
      message: 'Error in Decrement Categori',
      error
    })

    return false;
  }
}