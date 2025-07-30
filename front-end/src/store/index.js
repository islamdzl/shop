import Vue from 'vue'
import Vuex from 'vuex'

import controlles from './controlles';
import api from './api';

import product from './modules/product';
import sideBar from './modules/sideBar';
import naveBar from './modules/naveBar';
import user from './modules/user';
import alert from './modules/alert';
import explore from './modules/explore';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingState: false,
    theme: null,
  },
  getters: {
    loadingState: (state)=> state.loadingState,
  },
  modules: {
    controlles, api, user, product, sideBar, naveBar, explore, alert
  },
  mutations: {
  },
})