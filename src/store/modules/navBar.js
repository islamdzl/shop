import Cart from '../../assets/images/shopping-cart.png'
import About from '../../assets/images/information.png'
import Home from '../../assets/images/home.png'

export default {
  namespaced: true,
  state: {
    routeSelected: null,
    routes: [
      {name:'Home', path:'/', img: Home},
      {name:'Products', path:'/product', img: Cart},
      {name:'About', path:'/about', img: About},
    ]
  },
  getters: {
    routes(state) {
      return state.routes
    },
    routeSelected(state) {
      return state.routeSelected;
    }
  },
  mutation: {
    create(state, routes) {
      state.routes = routes;
    },
    goToPage(state, path) {
      if (this.$route.path === path) return;
      this.$router.push(path)
    },
    add(state, route) {
      state.routes.push(route)
    },
    remove(state, name) {
      state.routes = state.routes.filter((item)=>{
        if (item.name === name) return false;
        return true;
      })
    },
  }
}