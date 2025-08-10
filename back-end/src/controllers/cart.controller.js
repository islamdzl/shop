const Logger = require('../services/Logger');
const EHandler = require('../services/EHandler')
const Validations = require('../validations');

const Cart = require('../models/cart.model')
const Product = require('../models/product.model')
const Store = require('../models/store.model')
const Settings = require('../models/settings.model')

exports.shoppingCartAddProduct = async(req, res)=> {
  
  /*
    productId: {ObjectId},
    count: 1
  */

  const { user } = req
  const data = req.body;

  try{

    const { error, value } = Validations.Cart.shoppingCartAddIProduct(data);

    if (error) {
      EHandler.UCRError(res, error)
      return;
    }

    const product = await Product.findById(value.productId, {
      price: 1, name: 1, isAvailable: 1, ownerId: 1, stack: 1
    })

    if (! product || ! product.isAvailable) {
      EHandler.URError(res, EHandler.ERRORS.PRODUCT_NOT_AVAILABLE)
      return;
    }

    if (product.stack < value.count) {
      EHandler.URError(res, EHandler.ERRORS.PAYLOAD_TOO_LARGE)
      return;
    }

    const item = {
      productId: product._id,
      ownerId: product.ownerId,
      count: value.count,
      price: product.price,
    }

    const updatedCart = await Cart.findByIdAndUpdate( user._id,
      {
        $push:{
          shoppingCart: item
        },
      },
      {new: true}
    )

    res.status(200).json(updatedCart)
  }catch(error) {

    Logger.error({
      message: 'Error in shoppingCartAddProduct Controller Cart',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}

exports.shoppingCartremoveProduct = async(req, res)=> {

  /*
    productId: {ObjectId},
  */
 
  const { user } = req
  const data = req.body;

  try{

    const { error, value } = Validations.Cart.shoppingCartremoveProduct(data);

    if (error) {
      EHandler.UCRError(res, error)
      return;
    }

    const cart = await Cart.findById(user._id)

    cart.shoppingCart = cart.shoppingCart.filter((item)=> item.productId.toString() !== value.productId)

    await cart.save()
    res.status(200).json(cart)
  }catch(error) {

    Logger.error({
      message: 'Error in shoppingCartRemoveItem controller Cart',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}

exports.clearShoppingCart = async(req, res)=> {

  /*
    {}
  */

  const { user } = req;
  try{

    const updatedCart = await Cart.findByIdAndUpdate(user._id,
      {shoppingCart: []}, {new: true}
    )

    res.status(200).json(updatedCart)
  }catch(error) {

    Logger.error({
      message: 'Error in clearShoppingCart Controller Cart',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}


exports.BuyShoppingCart = async(req, res)=> {

  /*
    {}
  */

  const { user } = req;

  try{

    const settings = await Settings.findById(user._id, {buyingDetailes: 1})

    if (! settings.buyingDetailes) {
      res.redirect('/settings/buyingDetailes');
      return;
    }

    const cart = await Cart.findByIdAndUpdate(user._id,
      {shoppingCart: []},
      {new: false, projection: {}}
    )

    for (const item of cart.shoppingCart) {

      const product = await Product.findById(item.productId)

      const request = {          
        client: settings.buyingDetailes,
        clientId: user._id,
        productId: item.productId,
        count: item.count,
        name: product.name,
        fullPrice: item.price * item.count
      }

      if (! product || ! product.isAvailable || updatedProduct.stack - item.count < 0) {
        continue
      }

      product.requests += 1;
      if (product.stack) {
        product.stack -= item.count;
      }
      
      cart.buying.push(product)

      await product.save()
      await Store.findByIdAndUpdate(user._id,
        {
          $push: {
            requests: request
          }
        },
        {new: true, projection: {_id: 1}}
      )
    }

    await cart.save()
    res.status(200).json(cart)
  }catch(error) {

    Logger.error({
      message: 'Error in clearSuccess Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}



exports.clearSuccess = async(req, res)=> {

  /*
    {}
  */

  const { user } = req;
  try{



    const updtedCart = await Cart.findByIdAndUpdate(user._id,
      {success: []},
      {new: true}
    )
    res.status(200).json(updtedCart)
  }catch(error) {

    Logger.error({
      message: 'Error in clearSuccess Controller',
      error
    })

    EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
  }
}


exports.get = async(req, res)=> {
  /*
    {}
  */

    const data = req.body;
    const user = req.user;

    try{

      const cart = await Cart.findById(user._id);

      res.status(200).json(cart)
    }catch(error) {

      Logger.error({
        message: 'Error in get Controller Cart',
        error
      })

      EHandler.URError(res, EHandler.ERRORS.SYSTEM_ERROR)
    }
}