
export default {
  namespaced: true,
  state: {
    filters: {

    }
  },
  mutateions: {

  },
  actions: {
    async search(state) {
      console.log(state)
    }
  }
}

/**
 * 'ignore';
 *  [
 *    [products],
 *    {ads},
 *    [products]
 *  ]
 * 
 */