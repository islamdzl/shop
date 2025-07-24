

export default {
  namespaced: true,
  state: {
    productId: null,
    name: '___',
    price: 100,
  },
  mutations: {
    setDefaultItem(state, productId) {state.productId = productId}
  },
  getters: {
    price(state) {
      return state.price * 2
    },

  },
}