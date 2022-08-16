export default {
  namespaced: true,
  state: {
    prodi: [],
    matakuliah: [],
  },
  mutations: {
    setProdi: (state, prodi) => {
      state.prodi = prodi
    },
    setMatakuliah: (state, matakuliah) => {
      state.matakuliah = matakuliah
    }
  },
  actions: {
    setProdi: ({commit}, prodi) => {
      commit('setProdi', prodi)
    },
    setMatakuliah: ({commit}, matakuliah) => {
      commit('setMatakuliah', matakuliah)
    }
  },
  getters: {
    prodi: state => state.prodi,
    matakuliah: state => state.matakuliah
  }
}