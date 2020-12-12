import axios from 'axios'

const state = () => {
  return {
    token: localStorage.getItem('token') || null
  }
}

const getters = {
  isLogin (state) {
    if (state.token !== null && state.token !== 'undefined') {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  login (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('https://reqres.in/api/login', payload)
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          resolve('Login Success')
        }).catch((err) => {
          reject(err)
        })
    })
  },
  register (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('https://reqres.in/api/register', payload)
        .then((response) => {
          resolve(response.data.message)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  logout (context) {
    return new Promise((resolve) => {
      localStorage.removeItem('token')
      resolve('Logout Success')
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
