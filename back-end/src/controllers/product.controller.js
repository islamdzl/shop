const Logger = require('../services/Logger');
const EHandler = require('../services/EHandler/index')
const Validations = require('../validations')
const LDB = require('../services/LDB/index')

const Product = require('../models/product.model')
const Store = require('../models/store.model')
const Settings = require('../models/settings.model')

exports.BuyProduct = async(req, res)=> {
  /*
    user not required!

    {
      product: {
        id: {objectId}
        count: 1
      }

      buyingDetailes: {
        fullName: ''
        state: 16
        city: 'braki'
        phone1: '*********'
        phone2: '*********'
        description: ''
        deliveryToHome: false
      }
    }
  */

    const data = req.body;
    const user = req.user;

    try{

      const { error, value } = Validations.Product.buyProduct(data)

      if (error) {
        EHandler.UCRError(res, error)
        return;
      }

      let buyingDetailes = value.buyingDetailes;

      if (! buyingDetailes && user) {
        
        const projections = {buyingDetailes: 1}
        const settings = await Settings.findById(user._id, projections)

        if (! settings) {
          EHandler.URError(res, EHandler.ERRORS.SETTINGS_NOT_FOUND)
          return;
        }

        buyingDetailes = settings.buyingDetailes;
      }

      const product = await Product.findById(value.product.id, {
        price: 1,
        isAvailable: 1,
        ownerId:1,
        stack: 1,
        name: 1,
        requests: 1
      })

      if (! product || ! product.isAvailable) {
        EHandler.URError(res, EHandler.ERRORS.PRODUCT_NOT_AVAILABLE)
        return;
      }

      if (product.stack && product.stack < value.product.count) {
        EHandler.URError(res, EHandler.ERRORS.INVALID_COUNT)
        return;
      }

      product.requests += 1;

      if (product.stack) {
        product.stack -= value.product.count;
      }


      const request = {          
        client: buyingDetailes,
        clientId: user._id || null,
        productId: product._id,
        count: value.product.count,
        productName: product.name,
        fullPrice: product.price * value.product.count
      }

      await Store.findByIdAndUpdate(product.ownerId,
        {
          $push: {
            requests: request
          }
        },
        {new: true, projection: {_id: 1}}
      )
      await product.save()
      res.status(200).end()
    }catch(error) {

      Logger.error({
        message: 'Error in buyProduct Store',
        error
      })

      EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
    }
}

exports.getProduct = async(req, res)=> {
  /*
    user not required!

    {
      productId: {objectId}
    }
  */

    const user = req.user;
    const data = req.body;

    try{

      const { error, value } = Validations.Product.getProduct(data)
      
      if (error) {
        EHandler.UCRError(res, error)
        return;
      }

      const product = await Product.findById(value.productId)

      if (! product) {
        EHandler.URError(res, EHandler.ERRORS.PRODUCT_NOT_AVAILABLE)
        return;
      }

      res.status(200).json(product)
    }catch(error) {

      Logger.error({
        message: 'Error in getProduct Controller',
        error
      })

      EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
    }
}


exports.setAvailable = async(req, res)=> {
  /*
    user not required!

    {
      productId: {objectId}
      available: Boolean
    }
  */

    const user = req.user;
    const data = req.body;

    try{

      const { error, value } = Validations.Product.setAvailable(data)

      if (error) {
        EHandler.URError(res, EHandler.ERRORS.PRODUCT_ID_INVALID)
        return;
      }

      const product = await Product.findById(value.productId, {
        ownerId: 1,
        isAvailable: 1,
      })

      if (! product) {
        EHandler.URError(res, EHandler.ERRORS.PRODUCT_NOT_AVAILABLE)
        return;
      }

      product.isAvailable = value.available;

      if (value.stack) product.stack = value.stack;

      await product.save()

      res.status(200).json({stack: product.stack,isAvailable: product.isAvailable});
    }catch(error) {

      Logger.error({
        message: 'Error in getProduct Controller',
        error
      })

      EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
    }
}


exports.createNew = async(req, res)=> {
  /*
    {
      name: "String"
      ownerId: joi.object().required(),
      satack: Number | null
      price:   Number
      isAvailable: Boolean,
      description: String
      categories: [ "", ""],
      delivery: Number | null
    }
  */

    const data = req.body;
    const user = req.user;

    try{

      if (! await LDB.Uploads.getTempFiles(user._id)) {
        EHandler.URError(res, EHandler.ERRORS.PREVIOW_IMAGE_INVALID)
        return
      }


      data.ownerId = user._id;

      data.imagesUrls = await LDB.Uploads.resolveFiles(user._id)

      const { error, value } = Validations.Product.create(data);

      if (error) {
        EHandler.UCRError(res, error)
        return;
      }

      return

      await ProductService.createProduct(value, user._id)

      res.status(200).end()
    }catch(error) {

      Logger.error({
        message: 'Error in createNew Controller > Product',
        error
      })

      console.log(error)

      EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
    }
}