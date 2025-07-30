import store from './index'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },  
  actions: {
    async buyingProduct(state, productDetailes) {
      const alert = {
        title: 'Buying product ?'
      }
      store.commit('alert/setOnDone', async(values)=>{
        return await new Promise((resolve)=>{
          setTimeout(()=>{
            console.log(values)
            resolve(true);
          }, 1000)
        })
      })
      store.commit('alert/setOnCancel', async(values)=>{
        return await new Promise((resolve)=>{
          setTimeout(()=>{
            console.log(values)
            resolve('Error Verify');
          }, 1000)
        })
      })
      await store.dispatch('alert/create', alert)
      .then((data)=>{
        console.log('Buying Now', productDetailes, data)

      })
      .catch((data)=>{
        console.log('NO Buying !', data)
      })
    }
  }
}
