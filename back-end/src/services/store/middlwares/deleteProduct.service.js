


/*
  {
    productId
  }
 */

function deleteProduct(Store, detailes, next, reject) {

  if (! Array.isArray(Store.productList)) {
    next()
    return;
  }

  if (Store.productList.includes(detailes.productId)) {
    Store.productList = Store.productList.filter((id)=> id.toString() !== detailes.productId.toString())
  }

  next()
}

deleteProduct.required = {
  productList: 1
}

module.exports = deleteProduct;