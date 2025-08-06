const Logger = require('../services/Logger');
const ProductService = require('../services/product/index')
const ErrorHandler = require('../services/errorsHandler/index')
const Validations = require('../validations')
const StoreService = require('../services/store/index')
const CartService = require('../services/cart/index')
const Utils = require('../utils/index')
const LocalDB = require('../localDb/index')

exports.BuyProduct = async(req, res)=> {
  /*
    user not required!

    {
      product: {
        productId: {objectId}
        count: 1
      }

      buyingDetailes: {
        fullName: ''
        state: 16
        city: 'braki'
        phone1: '*********'
        phone2: '*********'
        description: ''
      }
    }
  */

    const data = req.body;
    const user = req.user;

    try{

      if (typeof data.product !== 'object') {
        ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_DATA)
        return;
      }

      if (! Validations.Others.objectId(data.product.productId)) {
        ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.PRODUCT_ID_INVALID)
        return;
      }

      const productId = data.product.productId;

      let buyingDetailes = {};

      if (user) {
        const cart = await CartService.getCartById(user._id, {buyingDetailes: 1})

        if (! cart) {
          ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.CART_NOT_FOUND)
          return;
        }

        buyingDetailes = cart.buyingDetailes;
      }else {

        if (typeof data.buyingDetailes !== 'object') {
          ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_DATA)
          return;
        }

        const validateBuyingDetailes = Validations.CartValidate.buyingDetailes(data.buyingDetailes)

        if (! validateBuyingDetailes.valid) {
          res.status(400).json({
            errors: validateBuyingDetailes.errors
          })
          return;
        }

        buyingDetailes = validateBuyingDetailes.value;
      }

      const product = await ProductService.getProduct(productId, {
        price: 1,
        isAvailable: 1
      })

      if (! product.isAvailable) {
        ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.PRODUCT_NOT_AVAILABLE)
        return;
      }

      const request = Utils.Merge.simpleMerge(buyingDetailes, {
        clientId: req.user?._id,
        count: data.count,
        ownerId: 1
      })

      const objectRequest = StoreService.createObjectRequest(request)

      if (! objectRequest) {
        ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_DATA)
        return
      }

      const storeOptions = {
        objectRequest
      }

      await StoreService.MidllwaresUseger(product.ownerId, storeOptions, StoreService.Middlewares.addRequest)
      await ProductService.MidllwaresUseger(product._id, {}, ProductService.Midllwares.requestEnc)

      res.status(200).end()
    }catch(error) {

      Logger.error({
        message: 'Error in buyProduct Store',
        error
      })

      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
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

      if (! Validations.Others.objectId(data.productId)) {

        ErrorHandler.useResponseError(ErrorHandler.ERRORS.PRODUCT_ID_INVALID)
        return;
      }

      const projection = {

      }

      const product = await ProductService.getProduct(data.productId, projection)

      if (! product) {

        ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.PRODUCT_NOT_AVAILABLE)
        return;
      }

      res.status(200).json(product)
    }catch(error) {

      Logger.error({
        message: 'Error in getProduct Controller',
        error
      })

      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
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

      if (! Validations.Others.objectId(data.productId)) {
        ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.PRODUCT_ID_INVALID)
        return;
      }

      if (typeof data.isAvailable !== 'boolean') {
        ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_DATA)
        return;
      }

      const productOptions = {
        isAvailable: data.isAvailable
      }

      await ProductService.MidllwaresUseger(data.productId, productOptions, ProductService.Midllwares.setStateAvailable)

    }catch(error) {

      Logger.error({
        message: 'Error in getProduct Controller',
        error
      })

      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
    }
}


exports.createNew = async(req, res)=> {
  /*
    {
      name: "String"
      ownerId: joi.object().required(),
      content: Number | null
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

      if (! data.packageId) {
        ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.PACKAGE_ID_INVALID)
        return;
      }

      const validate = Validations.Product.verifyDetailes(data);

      if (! validate.valid) {
        res.status(400).json({
          error: validate.errors[0]
        })
        return;
      }
      const resolvedPackage = await LocalDB.Uploads.resolveFiles(data.packageId)

      console.log(resolvedPackage)
      if (! resolvedPackage) {
        ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_PACKAGE)
        return;
      }

      const lastValidate = Validations.Product.create(Utils.Merge.simpleMerge(validate.value, {
        imagesUrls: resolvedPackage,
        ownerId: user._id
      }))

      res.json(lastValidate)

    }catch(error) {

      Logger.error({
        message: 'Error in createNew Controller > Product',
        error
      })

      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
    }
}