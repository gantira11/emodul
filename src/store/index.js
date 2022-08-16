import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../store/auth'
import alert from '../store/alert'
import dialog from '../store/dialog'
import prodi from '../store/prodi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideBar: true
  },
  getters: {
    sideBar: state => state.sideBar
  },
  mutations: {
    setSideBar: (state, value) => {
      state.sideBar = value
    }
  },
  actions: {
    setSideBar: ({commit}, value) => {
      commit('setSideBar', value)
    }
  },
  modules: {
    auth,
    alert,
    dialog,
    prodi
  }
})
