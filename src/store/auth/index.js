import axios from 'axios'

const state = () => {
  return {
    token: localStorage.getItem('token') || null
  }
}

const getters = {
  isLogin (state) {
    // eslint-disable-next-line quotes
    if (state.token !== null && state.token !== "undefined") {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  login (context, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post('https://reqres.in/api/login', payload)
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          resolve('Login Success')
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  },
  register (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('https://reqres.in/api/register', payload)
        .then((response) => {
          console.log(response)
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
