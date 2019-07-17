// import io from 'socket.io-client'

const state = {
  test: [
    {
      id: 'q',
      title: 'asdasdasd'
    },
    {
      id: 'qasd',
      title: 'asdasasdasddasd'
    }
  ]
}

const getters = {
  getTest: (state) => state.test
}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
