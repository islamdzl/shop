const path = require('path')
const fs = require('fs')

exports.yearMonthDay = (beforePath, afterPath)=> {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return path.join(beforePath, year.toString(), month.toString(), day.toString(), afterPath)
}

exports.year = (beforePath = '', afterPath = '')=> {
  const year = now.getFullYear()
  return beforePath + year.toString() + afterPath;
}

exports.month = (beforePath = '', afterPath = '')=> {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return beforePath + month.toString() + afterPath;
  
}
 
exports.year = (beforePath = '', afterPath = '')=> {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  return beforePath + day.toString() + afterPath;
}

exports.ifPathExist = (path)=> {
  if (! path || typeof path != 'string') {
    return false
  }
  return fs.existsSync(path)
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