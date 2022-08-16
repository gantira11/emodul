export default {
  namespaced: true,
  state: {
    status: false,
    component: '',
    id: ''
  },
  mutations: {
    setStatus: (state, status) => {
      state.status = status
    },
    setComponent: (state, component) => {
      state.component = component
    },
    setId: (state, id) => {
      state.id = id
    }
  },
  actions: {
    setStatus: ({commit}, status) => {
      commit('setStatus', status)
    },
    setComponent: ({commit}, component) => {
      commit('setComponent', component)
    },
    setId: ({commit}, id) => {
      commit('setId', id)
    }
  },
  getters: {
    status: state => state.status,
    component: state => state.component,
    id: state => state.id
  }
}