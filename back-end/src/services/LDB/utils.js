const path = require('path')
const fs = require('fs')
const Logger = require('../Logger')

const PT = path.join(__dirname, '../../uploads/temp')
const PU = path.join(__dirname, '../../uploads')

exports.yearMonthDay = (beforePath = '', afterPath = '')=> {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return path.join(beforePath, year.toString(), month.toString(), day.toString(), afterPath)
}

exports.year = (beforePath = '', afterPath = '')=> {
  const now = new Date()
  const year = now.getFullYear()
  return beforePath + year.toString() + afterPath;
}

exports.month = (beforePath = '', afterPath = '')=> {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return beforePath + month.toString() + afterPath;
  
}
 
exports.day = (beforePath = '', afterPath = '')=> {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  return beforePath + day.toString() + afterPath;
}

exports.ifPathExist = (Path)=> {
  if (! Path || typeof Path != 'string') {
    return false
  }
  return fs.existsSync(Path)
}

exports.createPath = (dirname, pathDir)=> {
  if (typeof pathDir !== 'string') {
    return null;
  }

  const paths = pathDir.split('/');

  for (let i = 1; i < paths.length; i++) {
    if (! fs.existsSync(path.join(dirname, ...paths.slice(0, i)))) {
      fs.mkdirSync(path.join(dirname, ...paths.slice(0, i)))
    }
  }
  return true;
}

exports.deleteFiles = (files = [])=> {
  return new Promise((resolve, reject)=> {

    if (! Array.isArray(files) || files.length === 0) {
      throw new Error('Invalid files to delete Path')
    }

    for (let i = 0; i < files.length; i++) {
      const filePath = files[i];

      fs.rmSync(filePath, {force: true})
    }
    resolve(true)
  })
}

exports.FindOne = async(Model, filter, projections = {})=> {
  return new Promise((resolve, reject)=> {
    Model.findOne(filter, projections, (error, payload)=> {
      if (error) return reject(error)
      resolve(payload)
    })
  })
}

exports.Insert = async(Model, payload)=> {
  return new Promise((resolve, reject)=> {
    Model.insert(payload, (error, payload)=> {
      if (error) return reject(error)
      resolve(payload)
    })
  })
}

exports.Update = async(Model, filter, payload)=> {
  return new Promise((resolve, reject)=> {
    Model.update(filter, payload, (error, updates)=> {
      if (error) return reject(error);
      resolve(updates)
    })
  })
}

exports.Delete = async(Model, filter = {}, options = {})=> {
  return new Promise((resolve, reject)=> {
    Model.remove(filter, options, (error, deleteds)=> {
      if (error) return reject(error);
      resolve(deleteds)
    })
  })
}

exports.ResolveUploadTempFiles = async(Model, filter)=> {
  try{
    const payload = await exports.FindOne(Model, filter)

    if (! payload) {
      throw new Error('Invalid payload')
    }

    const result = [];

    for (const file of payload.files) {
      const YMD = exports.yearMonthDay()
      
      const PFT = path.join(PT, file.name);
      const PFU = path.join(PU, YMD, file.name)

      if (fs.existsSync(PFT)) {

        if (! fs.existsSync(PFU)) {
          exports.createPath(PU, YMD)
        }

        fs.cpSync(PFT, PFU)
        fs.rmSync(PFT, {force: true})
        result.push(PFU)
      }
    }

    await exports.Delete(Model, filter)
    return result;
  }catch(error) {

    Logger.error({
      message: 'Error in ResolveUploadTempFiles utils LDB' + error,
      error
    })

    return []
  }
}

exports.RejectUploadTempFiles = async(Model, filter)=> {
  try{
    const payload = await exports.FindOne(Model, filter)

    for (const file of payload.files) {
      const PFT = path.join(PT, file.name);

      if (fs.existsSync(PFT)) {
        fs.rmSync(PFT, {force: true})
      }
    }
    return await exports.Delete(Model, filter)
  }catch(error) {

    Logger.error({
      message: 'Error in RejectUploadTempFiles utils LDB',
      error
    })
  }
}