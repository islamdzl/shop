import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product';
import sideBar from './modules/sideBar';
import navBar from './modules/navBar';
import user from './modules/user';
import explore from './modules/explore';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  modules: {
    user, product, sideBar, navBar, explore
  },
  mutations: {
    ENC(store) {
      store.counter ++;
    },    
    DEC(store) {
      store.counter --;
    }
  },
})
