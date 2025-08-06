const Logger = require('../services/Logger');
const CartService = require('../services/cart/index')
const StoreService = require('../services/store/index')
const ProductService = require('../services/product/index')
const ErrorHandler = require('../services/errorsHandler/index')
const Validations = require('../validations')

exports.shoppingCartAddProduct = async(req, res)=> {
  
  /*
    productId: {ObjectId},
    count: 1
  */

  const { user } = req
  const data = req.body;

  try{

    if (! Validations.Others.objectId(data.productId)) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.PRODUCT_ID_INVALID)
      return;
    }

    const product = await ProductService.getProduct(data.productId)

    if (! product) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.PRODUCT_NOT_AVAILABLE)
      return;
    }

    const options = {

      productCartObject: {
        id:         product._id,
        ownerId:    product.ownerId,
        name:       product.name,
        price:      product.price,
        preview:    product.imagesUrls,
        count:      data.count || 1,
      }

    }

    const processState = await CartService.MidllwaresUseger(user._id, options, CartService.Midllwares.cartAddProduct)

    if (! processState.statu) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
      return;
    }

    res.status(200).end()
  }catch(error) {

    Logger.error({
      message: 'Error in shoppingCartAddItem controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
  }
}

exports.shoppingCartremoveProduct = async(req, res)=> {

  /*
    productId: {ObjectId},
  */
 
  const { user } = req
  const data = req.body;

  try{

    if (! Validations.Others.objectId(data.productId)) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.PRODUCT_ID_INVALID)
      return;
    }

    const options = {
      productCartId: data.productId
    }

    const processState = await CartService.MidllwaresUseger(user._id, options, CartService.Midllwares.cartRemoveProduct)

    if (! processState.statu) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
      return;
    }

    res.status(200).end()
  }catch(error) {

    Logger.error({
      message: 'Error in shoppingCartRemoveItem controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
  }
}

exports.clearShoppingCart = async(req, res)=> {

  /*
    {}
  */

  const { user } = req;
  try{

    const cart = await CartService.getCartById(user._id)

    if (! cart) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.CART_NOT_FOUND)
      return;
    }

    const newCart = CartService.Services.clearShoppingCart(cart)

    await CartService.seveCart(newCart, user._id)

    res.status(200).end()
  }catch(error) {

    Logger.error({
      message: 'Error in clearShoppingCart Controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
  }
}


exports.BuyShoppingCart = async(req, res)=> {

  /*
    {}
  */

  const { user } = req;
  try{

    const cart = await CartService.getCartById(user._id)

    if (! cart) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.CART_NOT_FOUND)
      return;
    }

    if (! Validations.CartValidate.buyingDetailes(cart.buyingDetailes)) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.INVALID_DATA)
      return;
    }

    for (const product of cart.cart) {


      const objectRequest = Validations.StoreValidate.request(
        Object.assign(cart.buyingDetailes, {
          clientId: user._id,
          productId: product.id,
          count: product.count,
          fullPrice: product.price * product.count
        })
      )

      const { isAvailable } = await ProductService.getProduct(product.id, {isAvailable: 1})

      if (! isAvailable) {
        continue
      }

      const storeOptions = {
        objectRequest,
      }

      const cartOptions = {
        productBuyingObject: product,
      }

      await ProductService.MidllwaresUseger(product.id, {}, ProductService.Midllwares.requestEnc)
      await StoreService.MidllwaresUseger(user._id, storeOptions, StoreService.Middlewares.addRequest)
      await CartService.MidllwaresUseger(user._id, cartOptions, CartService.Midllwares.buyingAddProduct)
    }

    const newCart = CartService.Services.clearShoppingCart(cart)

    await CartService.seveCart(newCart, user._id)

    res.status(200).end()
  }catch(error) {

    Logger.error({
      message: 'Error in clearSuccess Controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
  }
}



exports.clearSuccess = async(req, res)=> {

  /*
    {}
  */

  const { user } = req;
  try{

    const cart = await CartService.getCartById(user._id)

    if (! cart) {
      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.CART_NOT_FOUND)
      return;
    }

    const newCart = CartService.Services.clearSuccess(cart)

    await CartService.seveCart(newCart, user._id)

    res.status(200).end()
  }catch(error) {

    Logger.error({
      message: 'Error in clearSuccess Controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
  }
}


exports.updateBuyingDetailes = async(req, res)=> {

  /*
    {
      fullName: ''
      state: 0
      city: ''
      phone1: '*********'
      phone2: '*********'
      description:  ''
    }
  */

  const { user } = req;
  const data = req.body;

  try{

    
    const validateBuyingDetailes = Validations.CartValidate.buyingDetailes(data)
    
    if (! validateBuyingDetailes.valid) {
      res.status(400).json({
        message: validateBuyingDetailes.errors
      })
      return;
    }
    
    const newCart = {
      buyingDetailes: validateBuyingDetailes.value
    }

    await CartService.seveCart(newCart, user._id)

    res.status(200).end()
  }catch(error) {

    Logger.error({
      message: 'Error in clearSuccess Controller',
      error
    })

    ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
  }
}

exports.get = async(req, res)=> {
  /*
    {}
  */

    const data = req.body;
    const user = req.user;

    try{

      const projections = {
        cart: 1,
        buying: 1,
        success: 1
      }

      const cart = await CartService.getCartById(user._id, projections);

      if (! cart) {
        ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.CART_NOT_FOUND)
        return;
      }


      res.status(200).json({
        shoppingCart: cart.cart,
        buying: cart.buying,
        success: cart.success
      })
    }catch(error) {

      Logger.error({
        message: 'Error in get Controller',
        error
      })

      ErrorHandler.useResponseError(res, ErrorHandler.ERRORS.SYSTEM_ERROR)
    }
}