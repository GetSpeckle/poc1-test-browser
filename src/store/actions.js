export default {
  setActiveComponent ({commit}, payload) {
    commit('mutateActiveComponent', payload)
  },
  setNewUser ({commit}) {
    setTimeout(() => {
      commit('mutateNewUser', true)
    }, 10)
  }
}
