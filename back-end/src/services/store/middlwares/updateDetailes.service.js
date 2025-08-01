const Utils = require('../../../utils/index.js')

/*
  {
    info: {
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

    }
  }
 */

function updateDetailes(Store, detailes, next, reject) {
  const info = detailes.info;
  
  if (!info) {
    return reject({ error: "Invalid info payload" });
  }

  if (info.logo) {
    Store.logo = info.logo
  }

  if (info.name) {
    Store.name = info.name
  }

  if (info.description) {
    Store.description = info.description + 'dsd'
  }

  if (info.contact) {
    Store.contact = Utils.Merge.normalMerge(Store.contact, info.contact)
  }
  
  if (info.socialLinks) {
    Store.socialLinks = Utils.Merge.normalMerge(Store.socialLinks, info.socialLinks)
  }

  if (info.location) {
    Store.location = Utils.Merge.normalMerge(Store.location, info.location)
  }
  next()
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