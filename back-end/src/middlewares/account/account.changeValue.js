const mongoose = require('mongoose')
const Utils = require('../../utils/index')
const { v4: uuidv4 } = require('uuid')

const username = function () {
  if (this.name) {
    return this.name.slice(0, 8) + uuidv4().slice(0, 4);
  }
  return uuidv4().slice(0, 12);
}

module.exports = async function (next) {
  
  if (!this.username) {
    this.username = username.call(this)
  }

  if (!this.store) {
    const Store = mongoose.model('Store')
    const newStore = new Store({
      _id: this._id,
      logo: this.picture,
      name: this.name || 'Unnamed Store',
    })
    await newStore.save()
    this.store = newStore._id
  }

  if (!this.cart) {
    const Cart = mongoose.model('Cart')
    const newCart = new Cart({
      _id: this._id 
    })
    await newCart.save()
    this.cart = newCart._id
  }

  if (this.isModified('password')) {
    this.password = await Utils.Hash.hash(this.password)
  }

  next()
}