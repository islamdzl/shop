import app from '@/main';
import store from '../store'
import Utils from "@/utils/controller";

export default {
  state: {
    colorTheme: null,
    roll: null,
    views: {},
  },
  getters: {
    colorTheme: (state)=> state.colorTheme + '-mode',
  },
  mutations: {
    setRoll(state, roll) {
      state.roll = roll;
    },
    setTheme: (state, theme)=> {
      state.colorTheme = theme;
      Utils.setColorTheme(theme);
    },
    checkView(state, path) {
      if (typeof state.views[path] === 'string') {
        app.$router.push(state.views[path])
      }
      if (state.views[path] === false) {
        console.log(window.history.length)
        console.log(window.history.length)
        console.log(window.history.length)
        console.log(window.history.length)
        if (window.history.length > 2) {
          app.$router.go(-1);
        }else {
          app.$router.push('/');
        }
      }
    },
  },  
  actions: {
    async init(state, App) {
      store.commit('setTheme', 'dark') 
      setInterval(()=>{
        store.commit('setTheme', Utils.getColorTheme() == 'dark' ? 'light' : 'dark')   
      }, 5000)
      if (! store.state.user.isLogin) {
        Utils.useRoll(Utils.Roles.Gust, App);
        store.commit('setTheme', Utils.getColorTheme()) 
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
