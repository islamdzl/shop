export default {
  namespaced: true,
  state: {
    routeSelected: null,
    sideBarIcon: null,
    routes: [
      // {name:'About', path:'/about', img: About},
    ]
  },
  getters: {
    routes: (state)=> state.routes,
    routeSelected: (state)=> state.routeSelected,
    sideBarIcon: (state)=> state.sideBarIcon
  },
  mutations: {
    create(state, routes) {
      state.routes = routes;
    },
    goToPage(state, path) {
      if (this.$route.path === path) return;
      this.$router.push(path)
    },
    buttons(state, buttons) {
      state.routes = buttons;
    },
    setSideBarIcon(state, icon) {
      state.sideBarIcon = icon;
    }
  }
}