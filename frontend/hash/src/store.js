import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: 'asdasdasd test'
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getTest (state) {
      return state.test
    }
  }
})
