// store.js
import { createStore } from 'vuex'

const store = createStore({
  state: {
    isAuthenticated: false // This should be set to true upon successful login
  },
  mutations: {
    setAuthenticated(state, payload) {
      state.isAuthenticated = payload
    }
  },
  actions: {
    login({ commit }) {
      // Perform login logic here and set isAuthenticated to true
      commit('setAuthenticated', true)
    },
    logout({ commit }) {
      // Perform logout logic here and set isAuthenticated to false
      commit('setAuthenticated', false)
    }
  }
})

export default store
