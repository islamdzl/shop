
export default {
  namespaced: true,
  state: {
    data:{
      title: '',
      list: []
    },
    message: '',
    isAlert: false,
    onCancel: async()=> true,
    onDone:   async()=> true,
    __resolve: null,
    __reject: null,
  },
  getters: {
    isAlert: (state) => state.isAlert,
    message: (state) => state.message,
    data: (state) => state.data,
    onDone: (state)=> state.onDone,
    onCancel: (state)=> state.onCancel,
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    setOnCancel(state, callback) {
      state.onCancel = callback;
    },
    setOnDone(state, callback) {
      state.onDone = callback;
    },
  },
  actions: {
    create({ state }, data) {
      return new Promise((resolve, reject) => {
          state.data = data;
          state.isAlert = true;
          state.__resolve = resolve;
          state.__reject = reject;
      });
    },
    async done({ state }, data) {
      const verifyState = await state.onDone(data)
      if (verifyState === true) {
        if (state.__resolve) state.__resolve(data);
        state.data = {};
        state.message = '';
        state.isAlert = false;
        state.onCancel = async()=> true;
        state.onDone   = async()=> true;
        state.__resolve = null;
        state.__reject = null;
      }
      return verifyState
    },
    async cancel({ state }, data) {
      const verifyState = await state.onCancel(data)
      if (verifyState === true) {
        if (state.__reject) state.__reject(data);
        state.data = {};
        state.message = '';
        state.isAlert = false;
        state.onCancel = async()=> true;
        state.onDone   = async()=> true;
        state.__resolve = null;
        state.__reject = null;
      }
      return verifyState
    },
  }
}