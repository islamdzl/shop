import app from "@/main"

export default {
  namespaced: true,
  state: {
    isLogin: false,
    buyingDetiles: (JSON.parse(localStorage.getItem('buying-detiles')) || null),
    _buyingDetilesResolver: null,
  },
  getters: {
    _buyingDetilesResolver: state => state._buyingDetilesResolver,
    buyingDetiles: state => state.buyingDetiles,
  },
  mutations: {
    setBuyingResolver(state, resolver) {state._buyingDetilesResolver = resolver},
    resolveBuyingDetiles(state, buyingDetiles) {
      state.buyingDetiles = buyingDetiles
      localStorage.setItem('buying-detiles', JSON.stringify(buyingDetiles))
      if (state._buyingDetilesResolver) {
        state._buyingDetilesResolver()
        state._buyingDetilesResolver = null
        app.$router.back()
      }
    }
  },
  actions: {
    async verifyBuyingDetiles({commit, state}) {
      return new Promise((resolve)=>{
        if (! state.buyingDetiles) {
          commit('setBuyingResolver', resolve)
          app.$router.push('/buying_detales')
        }else resolve()
      })
    },
  }
}