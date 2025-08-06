module.exports = async function (next) {
  const isSave = !!this.isModified;
  const mongoose = require('mongoose')
  const Store = mongoose.model('Store')
  const Cart = mongoose.model('Cart')

  if (isSave) {
    if (!this.username) {
      this.username = this.name ? this.name.slice(0, 8) + uuidv4().slice(0, 4) : uuidv4().slice(0, 12)
    }

    if (!this.store) {
      const newStore = new Store({
        _id: this._id,
        logo: this.picture,
        name: this.name || 'Unnamed Store',
        productList: []
      })
      await newStore.save()
      this.store = newStore._id
    }

    if (!this.cart) {
      const newCart = new Cart({ _id: this._id })
      await newCart.save()
      this.cart = newCart._id
    }

    if (this.isModified('password')) {
      this.password = await Utils.Hash.hash(this.password)
    }

  } else {
    const update = this.getUpdate()

    if (update._id) delete update._id

    this.setUpdate(update)
  }

  next()
}
