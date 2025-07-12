

export default {
  namespaced: true,
  state: {
    name: '___',
    price: 100,
  },
  mutations: {
    E(state) {
      state.price = state.price *2;
    }
  },
  getters: {
    price(state) {
      return state.price * 2
    },

  },
}