import store from "@/store/index";
import IBasket from '../assets/images/basket.png';
// import IShoppingCart from '../assets/images/shopping-cart.png';
import IPackage from '../assets/images/package.png';

export const Roles = {
  Gust: {
    naveBar: [
      {name:'Login', path:'/login', img: IBasket},
      {name:'Explore', path:'/explore', img: IPackage},
      {name:'My Profile', path:'/buying/detales', img: IPackage},
    ],
    baseView: '/explore',
    views: {
      '/create/product' : '/login',
      '/cart'           : '/login',
      '/buying'         : '/login',
      '/settings'       : '/login',
      '/buying/detales' : true,
      '/register'       : true,
      '/explore'        : true,
      '/login'          : true,
      '/home'           : true,
    }
  },
  Seller: {
    naveBar: [
      {name:'Create', path:'/create/product', img: import('../assets/images/basket.png')},
      {name:'Status', path:'/cart', img: import('../assets/images/basket.png')},
      {name:'Orders', path:'/explore', img: import('../assets/images/basket.png')},
    ],
    baseView: '/status',
    views: {
    }
  },
  Client: {
    naveBar: [
      {name:'Buying', path:'/buying', img: import('../assets/images/basket.png')},
      {name:'Cart', path:'/cart', img: import('../assets/images/basket.png')},
      {name:'Explore', path:'/explore', img: import('../assets/images/basket.png')},
    ],
    baseView: '/explore',
    views: {
    }
  },
  Admin: {
    naveBar: [
      {name:'waiting', path:'/buying', img: import('../assets/images/basket.png')},
      {name:'ads', path:'/cart', img: import('../assets/images/basket.png')},
      {name:'accounts', path:'/explore', img: import('../assets/images/basket.png')},
    ],
    baseView: '/controler',
    views: {
    }
  },
}

export const reLoad = ()=> {
  location.htef = location.href;
}

export const getUser = async(local)=>{
  if (local) {
    if (! store.state.user.USER) return null;
    return store.state.user.USER;
  }
  await store.dispatch('user/getUser');
}

export const getToken = ()=>{
  return localStorage.getItem('token') ?? null;
}

export const setToken = (token)=>{
  if (token) {
    localStorage.setItem('token', token);
  } else localStorage.removeItem('token');
}

export const baseURL =  `${location.protocol}//${location.host}`;

export const useRoll = (role, app, user)=> {
  const controler = store.state.controlles
  store.commit('naveBar/buttons', role.naveBar);
  controler.accountRole = role;
  controler.views = role.views;
  setTimeout(()=>{
   if (app.$route.path === '/') app.$router.push(role.baseView);
  }, 100)
  console.log(user)
}
export default {
  baseURL, Roles,
  getToken, getUser, reLoad, setToken,
  useRoll, 
}
