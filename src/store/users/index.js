import axios from 'axios'

const state = () => {
  return {
    all: {
      data: [],
      isLoading: false
    }
  }
}

const getters = {
  getAllUser (state) {
    return state.all
  }
}

const mutations = {
  SET_ALL_DATA (state, payload) {
    state.all.data = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  }
}
const actions = {
  getAllUser (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`https://reqres.in/api/users?page=${payload}`)
        .then((response) => {
          context.commit('SET_ALL_DATA', response.data.data)
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  addUser (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('https://reqres.in/api/users', payload)
        .then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  getDetail (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`https://reqres.in/api/users/${payload}`)
        .then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  updateUser (context, payload) {
    return new Promise((resolve, reject) => {
      axios.patch(`https://reqres.in/api/users/${payload.id}`, payload)
        .then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  delUser (context, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`https://reqres.in/api/users/${payload}`)
        .then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
