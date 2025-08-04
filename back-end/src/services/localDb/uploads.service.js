const DataStore = require('nedb');
const DataStoreUseger = require('./db.useger');
const Utils = require('../../utils/index');
const Logger = require('../Logger');
const path = require('path')
const fs = require('fs')

const directoryTempPath = path.join(__dirname, '../../uploads/temp')
const directoryUploadsPath = path.join(__dirname, '../../uploads')

const uploads = new DataStore({
  filename: './datastore/uploads.db',
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



exports.pushFileInWaiting = async(packageId, fileName)=> {

  try {

    const objectDB = await exports.findOne({packageId})

    objectDB.fileNames.push(fileName)

    await exports.update({packageId}, objectDB)

    return true;
  }catch(error) {

    Logger.error({
      message: 'Error in create object uploads',
      error
    })

    return false;
  }
}

exports.resolveFiles = async(packageId)=> {
  try {

    if (typeof packageId != 'string') {
      throw new Error('packageId is required')
    }

    const object = await exports.findOne({packageId})

    if (! object) return false;

    const filesPath = [];

    if (! fs.existsSync(directoryTempPath)) {
      fs.mkdirSync(directoryTempPath)
    }

    for (const filename of object.fileNames) {

      const fileTempPath = path.join(__dirname, '../../uploads/temp', filename);
      const destinationDirectory = path.join(directoryUploadsPath, Utils.Path.yearMonthDay())
      if (fs.existsSync(fileTempPath)) {
        
        
        if (! fs.existsSync(destinationDirectory)) {
          Utils.Path.createPath(directoryUploadsPath, Utils.Path.yearMonthDay())
        }
        
        const newFileName = `${Utils.Uuid.generateUuid()}.${path.extname(filename).slice(1)}`
        const fullpathFile = path.join(destinationDirectory, newFileName)

        fs.cpSync(fileTempPath, fullpathFile)
        fs.rmSync(fileTempPath, {force: true})

        filesPath.push(fullpathFile)
      }
    }
    await exports.remove({packageId})

    return filesPath;
  }catch(error) {

    Logger.error({
      message: 'Error in resolveFiles uploads',
      error
    })

    return null;
  }
}

exports.rejectFiles = async(packageId)=> {

  try{

    if (typeof packageId != 'string') {
      throw new Error('packageId is required')
    }

    const objectDB = await exports.findOne({packageId})

    if (! objectDB) return false;

    for (const filename of objectDB.fileNames) {

      const filePath = path.join(directoryTempPath, filename)

      if (! fs.existsSync(filePath)) {
        continue;
      }

      fs.rmSync(filePath, {force: true})
    }

    await exports.remove({packageId})

    return true;
  }catch(error) {

    Logger.error({
      message: 'Error in rejectFiles uploads',
      error
    })

    return false;
  }
}

exports.generatePackageId = (userId)=> {

  const randomId = Utils.Uuid.generateUuid()
  setTimeout(() => exports.rejectFiles(randomId), 15 * 60 * 1000);

  const obgectDb = {
    packageId: randomId,
    userId
  }

  exports.insert(obgectDb)

  return randomId;
}