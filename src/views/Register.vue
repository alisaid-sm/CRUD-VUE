<template>
    <div class="register">
      <div class="register-box">
          <h1>Register</h1>
          <form @submit.prevent='register'>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <p class="mt-3">Sudah memiliki akun ? <router-link to="/login">Login disini</router-link></p>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'Register',
  data () {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    register () {
      if (!this.form.email && !this.form.password) {
        Swal.fire('Oops...', 'Email dan Password harus diisi!', 'error')
      } else {
        this.actionRegister(this.form)
          .then((resolve) => {
            Swal.fire('Succes', 'Register Success, Silahkan Login', 'success')
          }).catch(() => {
            Swal.fire('Oops...', 'Note: Only defined users succeed registration', 'error')
          })
      }
    },
    ...mapActions({
      actionRegister: 'auth/register'
    })
  }
}
</script>

<style>
.register {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.register .register-box {
    width: 500px;
}
.register .register-box h1 {
    text-align:center;
}
</style>
