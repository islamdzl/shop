const _ = require('lodash')

exports.simpleMerge = (oldData, newData)=> {
  return _.assign({}, oldData, newData)
}

exports.normalMerge = (oldData, newData)=> {
  return _.merge({}, oldData, newData)
}

/**
 * -merge arrays
 * @requires *
 * @param {Object} oldData 
 * @param {Object} newData 
 * @returns {Object} 
 */
exports.deepMerge = (oldData, newData)=> {
  return _.mergeWith({}, oldData, newData, (Old, New)=> {
    if (Array.isArray(oldValue) && Array.isArray(newValue)) {
      return [...new Set([...oldValue, ...newValue])]
    }
  })
}