const Product = require('../../models/product.model')
const Logger = require('../Logger')
const Validations = require('../../validations/index')
const LocalDB = require('../localDb/index')

module.exports = async(productDetailes)=> {

  try{

    if (typeof productDetailes !== 'object') {
      throw new Error('Invalid Product Detailes Object')
    }

    if (! typeof productDetailes.packageId !== 'string') {
      throw new Error('Invalid packageId')
    }
    
    productDetailes.imagesUrls = await LocalDB.Uploads.resolveFiles(productDetailes.packageId)

    const validProduct = Validations.Product.create(productDetailes)

    if (! validProduct.valid) {
      return {
        success: false,
        errors: validProduct.errors
      }
    }

    const product = new Product(validProduct.value)
    await product.save()

    return product;
  }catch(error) {

    Logger.error({
      message: 'Error in create Product',
      error
    })

    return null;
  }
}