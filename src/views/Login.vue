<template>
  <div class="login">
      <div class="login-box">
          <h1>Login</h1>
          <form @submit.prevent='login'>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <p class="mt-3">Anda belum memiliki akun ? <router-link to="/register">Daftar disini</router-link></p>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    login () {
      if (!this.form.email && !this.form.password) {
        Swal.fire('Oops...', 'Email dan Password harus diisi!', 'error')
      } else {
        this.actionLogin(this.form)
          .then((resolve) => {
            localStorage.setItem('email', this.form.email)
            window.location = '/'
          }).catch(() => {
            Swal.fire('Oops...', 'User not found', 'error')
          })
      }
    },
    ...mapActions({
      actionLogin: 'auth/login'
    })
  }

}
</script>

<style scoped>
.login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login .login-box {
    width: 500px;
}
.login .login-box h1 {
    text-align:center;
}
</style>
