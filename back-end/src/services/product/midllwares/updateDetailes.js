const Validations = require('../../../validations/index.js')
const Logger = require('../../Logger.js')
const Utils = require('../../../utils/index.js')

/*
  {
    prodectDetailes: {
      name: joi.string().min(3).max(20).required(),
      price: joi.number().min(0).default(0),
      isAvailable: joi.boolean().default(true),
      description: joi.string().default('No discription !'),
      categories: joi.array().min(1).required(),
      delivery: joi.number().default(null)}
    }
  }
 */

async function updateProductDetailes(Product, detailes, next, reject) {

  const productDetailes = detailes.prodectDetailes;

  try {

    if (! productDetailes || typeof productDetailes !== 'object') {
      throw new Error('Invalid prodectDetailes Object')
    }

    if (productDetailes.name) {
      Product.name = productDetailes.name;
    }

    if (productDetailes.price) {
      Product.price = productDetailes.price;
    }

    if (productDetailes.description) {
      Product.description = productDetailes.description;
    }

    if (productDetailes.categories) {
      Product.categories = productDetailes.categories;
    }

    if (productDetailes.delivery) {
      Product.delivery = productDetailes.delivery;
    }

    const validata = Validations.Product.create(Product)

    if (validata.valid) {

      Utils.Merge.simpleMerge(Product, validata.value)

      next();
      return;
    }
    
    reject(validata.errors)
  }catch(error) {

    Logger.error({
      message: 'Error in update product detailes',
      error
    })

    reject(error);
  }
}

updateProductDetailes.required = {
  name: 1,
  price: 1,
  description: 1,
  categories: 1,
  delivery: 1,
}

module.exports = updateProductDetailes