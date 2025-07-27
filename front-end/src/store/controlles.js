import app from '@/main';
import store from '../store'
import Utils from "@/utils/controller";

export default {
  namespaced: true,
  state: {
    roll: null,
    views: {}
  },
  mutations: {
    setRoll(state, roll) {
      state.roll = roll;
    },
    checkView(state, path) {
      if (typeof state.views[path] === 'string') {
        app.$router.push(state.views[path])
      }
      if (! state.views[path]) {
        app.$router.back()
      }
    },
  },  
  actions: {
    async init(state, App) {
      console.log('ISLAM')
      if (! store.state.user.isLogin) {
        Utils.useRoll(Utils.Roles.Gust, App);
        return;
      }
      try {
        const USER = await Utils.getUser()
        Utils.useRoll(Utils.Roles[USER.role], App, USER)
      }catch (e) {
        console.error('Error Initilize app:', e);
      }
    }
  }
}
