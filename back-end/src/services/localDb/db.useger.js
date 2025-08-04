
exports.insert = async(dataStore, middlware, data)=> {

  if (typeof dataStore !== 'object') return null;
  
  return new Promise((resolve, reject)=> {
    
    const next = ()=> {

      if (typeof data      !== 'object') return reject('invalid data');

      dataStore.insert(data, (err, data)=> {

        if (err) {
          reject(err)
          return;
        }

        resolve(data)
      })
    }

    const cansel = (err = null)=> {
      reject(err)
    }

    middlware(data, next, cansel)
  })
}

exports.exist = (dataStore, condition, resolve) => {
  
  dataStore.findOne(condition, (err, doc) => {
    if (err) {
      Logger.error({ message: 'Error in exist uploads', error: err })
      return resolve(false)
    }

    resolve(!!doc)
  })
}


exports.findOne = async(dataStore, middlware, condition = {}, projection = {})=> {

  if (typeof dataStore !== 'object') return null;
  
  return new Promise((resolve, reject)=> {
    
    const next = ()=> {
      
      if (typeof condition  !== 'object') return reject('invalid condition');
      if (typeof projection !== 'object') return reject('invalid projection');

      dataStore.findOne(condition, projection, (err, data)=> {

        if (err) {
          reject(err)
          return;
        }

        resolve(data)
      })
    }

    const cansel = (err = null)=> {
      reject(err)
    }

    middlware({condition, projection}, next, cansel)
  })
}

exports.find = async(dataStore, middlware, condition = {}, projection = {})=> {

  if (typeof dataStore !== 'object') return null;
  
  return new Promise((resolve, reject)=> {

    const next = ()=> {
      
      if (typeof condition  !== 'object') return reject('invalid condition');
      if (typeof projection !== 'object') return reject('invalid projection');

      dataStore.find(condition, projection, (err, data)=> {

        if (err) {
          reject(err)
          return;
        }

        resolve(data)
      })
    }

    const cansel = (err = null)=> {
      reject(err)
    }

    middlware({condition, projection}, next, cansel)
  })
}


exports.update = async(dataStore, middlware, condition = {}, data = {}, options = {})=> {

  if (typeof dataStore !== 'object') return null;
  
  return new Promise((resolve, reject)=> {
    
    const next = ()=> {

      if (typeof condition  !== 'object') return reject('invalid condition');
      if (typeof data       !== 'object') return reject('invalid data');
      if (typeof options    !== 'object') return reject('invalid options');

      dataStore.update(condition, data, options, (err, updates)=> {

        if (err) {
          reject(err)
          return;
        }

        resolve(updates)
      })
    }

    const cansel = (err = null)=> {
      reject(err)
    }

    middlware({condition, data, options}, next, cansel)
  })
}

exports.remove = async(dataStore, middlware, condition = {}, options = {})=> {

  if (typeof dataStore !== 'object') return null;

  return new Promise((resolve, reject)=> {
    
    const next = ()=> {

      if (typeof condition  !== 'object') return reject('invalid condition');
      if (typeof options    !== 'object') return reject('invalid options');

      dataStore.remove(condition, options, (err, removeds)=> {

        if (err) {
          reject(err)
          return;
        }

        resolve(removeds)
      })
    }

    const cansel = (err = null)=> {
      reject(err)
    }

    middlware(data, next, cansel)
  })
}
