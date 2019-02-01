import queryString from 'query-string'

export const state = () => ({
  products: [],
  meta: []
})

export const getters = {
  products (state) {
    return state.products
  },
  meta(state) {
    return state.meta
  }
}

export const mutations = {
  SET_PRODUCTS(state, products){
    state.products = products
  },
  SET_META(state, meta){
    state.meta = meta
  }
}

export const actions = {
  async getProducts({ commit, state }, params) {
    console.log(params);
    let response = await this.$axios.$get(`products?${queryString.stringify(params)}`)

    commit('SET_PRODUCTS', response.data)
    commit('SET_META', response.meta)

    console.log(response.data);

    return response
  }
}
