import Vue from 'vue'
import Vuex from 'vuex'
import controlles from './controlles';

import product from './modules/product';
import sideBar from './modules/sideBar';
import naveBar from './modules/naveBar';
import user from './modules/user';
import explore from './modules/explore';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingState: false,
  },
  getters: {
    loadingState: (state)=> state.loadingState,
  },
  modules: {
    controlles, user, product, sideBar, naveBar, explore
  },
  mutations: {
  },
})