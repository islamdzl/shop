import IBasket from '../../assets/images/basket.png'
import IShoppingCart from '../../assets/images/shopping-cart.png'
// import About from '../../assets/images/information.png'

export default {
  namespaced: true,
  state: {
    routeSelected: null,
    routes: [
      {name:'Buying', path:'/buying', img: IBasket},
      {name:'Cart', path:'/cart', img: IShoppingCart},
      {name:'Explore', path:'/explore', img: IBasket},
      // {name:'About', path:'/about', img: About},
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