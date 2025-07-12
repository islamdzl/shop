import Vue from 'vue'
import Vuex from 'vuex'
import item from './modules/item';
import sideBar from './modules/sideBar';
import navBar from './modules/navBar';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  modules: {
    item, sideBar, navBar
  },
  mutations: {
    ENC(store) {
      store.counter ++;
    },    
    DEC(store) {
      store.counter --;
    }
  },
  actions: {
  },
})
