const Logger = require('../../Logger.js');
const Utils = require('../../../utils/index.js');

/*
  {
    storeDetailes: {
      logo: string '<link>',
      name: 'string',
      description: string,
      
      location: {
        country: Number,
        city: string,
        address: strings
      },

      contact: {
        phone: string,
        email: string
      },

      socialLinks: {
        facebook: string,
        instagram: string,
        twitter: string
      }
      categories: [string]
    }
  }
 */

function updateDetailes(Store, detailes, next, reject) {
  const storeDetailes = detailes.storeDetailes;
  
  try {
    if (!storeDetailes) {
      return reject({ error: "Invalid storeDetailes payload" });
    }

    if (storeDetailes.logo) {
      Store.logo = storeDetailes.logo
    }

    if (storeDetailes.name) {
      Store.name = storeDetailes.name
    }

    if (storeDetailes.categories) {
      Store.categories = storeDetailes.categories
    }

    if (storeDetailes.description) {
      Store.description = storeDetailes.description
    }

    if (storeDetailes.contact) {
      Store.contact = Utils.Merge.normalMerge(Store.contact, storeDetailes.contact)
    }
    
    if (storeDetailes.socialLinks) {
      Store.socialLinks = Utils.Merge.normalMerge(Store.socialLinks, storeDetailes.socialLinks)
    }

    if (storeDetailes.location) {
      Store.location = Utils.Merge.normalMerge(Store.location, storeDetailes.location)
    }
    next()

  }catch(error) {

    Logger.error({
      message: 'Error in update detailes Store',
      error
    })

    reject(error)
  }
}

updateDetailes.required = {
  logo: 1,
  name: 1,
  description: 1,
  location: 1,
  contact: 1,
  socialLinks: 1,
}

module.exports = updateDetailes;