

exports.clearShoppingCart = async(cart)=> {
  return {
    cart: [],
    buying: cart.buying,
    success: cart.success,
  }
}

exports.clearBuying = async(cart)=> {
  return {
    cart: cart.cart,
    buying: [],
    success: cart.success,
  }
}

exports.clearSuccess = async(cart)=> {
  return {
    cart: cart.cart,
    buying: cart.buying,
    success: [],
  }
}

exports.clearAllCart = async()=> {
  return {
    cart: [],
    buying: [],
    success: [],
  }
}

exports.listHas = (list, productId)=> {
  if (Array.isArray(list)) {
    return list.includes(productId)
  }
  return null;
}