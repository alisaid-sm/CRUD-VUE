<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="#">CRUD VUE</router-link>
        <div class="d-flex ml-auto">
          <p class="mt-3">{{ email }}</p>
          <b-dropdown
            size="sm"
            variant="link"
            toggle-class="text-decoration-none"
            offset="-60"
            no-caret
          >
            <template #button-content>
              <b-icon icon="person"></b-icon>
            </template>
            <b-dropdown-item @click="onLogout">Log Out</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="d-flex mt-5">
        <h4>List Users</h4>
        <button class="btn btn-success ml-auto" v-b-modal.modal-add>
          Add User
        </button>
      </div>
      <b-pagination
        @input="page()"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        class="mt-2"
      ></b-pagination>
      <div class="row mt-2 text-center">
        <div class="col-12" v-if="allUsers.isLoading">
          <b-icon icon="arrow-clockwise" animation="spin-pulse" font-scale="4"></b-icon>
        </div>
        <div v-else class="col-sm-3" v-for="(item, index) in allUsers.data" :key="index">
          <div class="card">
            <div class="card-body">
              <img :src="`${item.avatar}`" class="img-fluid" alt="" />
              <p class="card-text">{{ item.first_name }}</p>
              <a @click="detailUser(item.id, index)" class="btn btn-primary mr-2" v-b-modal.modal-detail>Detail</a
              >
              <a @click="delUser(item.id)" class="btn btn-danger"
                >Delete</a
              >
            </div>
          </div>
        </div>
      </div>
      <h4 class="mt-5 mb-3">Users Created</h4>
      <div class="row mt-2 mb-5 text-center">
        <div v-if="users.length == 0" class="col-12">
          <h1>404 Not Found</h1>
        </div>
        <div v-else class="col-sm-3" v-for="(item, index) in users" :key="index">
          <div class="card">
            <div class="card-body">
              <img :src="`${item.avatar}`" class="img-fluid" alt="" />
              <p class="card-text">{{ item.firstName }} {{ item.lastName }}</p>
              <p>Email: {{item.email}}</p>
              <p>Created at: {{item.createdAt}}</p>
            </div>
          </div>
        </div>
      </div>
      <h4 class="mt-5 mb-3">Users Updated</h4>
      <div class="row mt-2 mb-5 text-center">
        <div v-if="updated.length == 0" class="col-12">
          <h1>404 Not Found</h1>
        </div>
        <div v-else class="col-sm-3" v-for="(item, index) in updated" :key="index">
          <div class="card">
            <div class="card-body">
              <img :src="`${item.avatar}`" class="img-fluid" alt="" />
              <p class="card-text">{{ item.firstName }} {{ item.lastName }}</p>
              <p>Email: {{ item.email }}</p>
              <p>Updated at: {{item.updatedAt}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="modal-add" title="Add Users" hide-footer>
      <form @submit.prevent="addUser">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="add.email"
            required
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="firstname">First Name</label>
          <input v-model="add.firstName" type="text" class="form-control" id="firstname" required>
        </div>
        <div class="form-group">
          <label for="lastname">Last Name</label>
          <input v-model="add.lastName" type="text" class="form-control" id="lastname" required>
        </div>
        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input v-model="add.avatar" type="url" class="form-control" id="avatar" placeholder="put the image link here" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </b-modal>
          <b-modal id="modal-detail" title="Detail Users" hide-footer>
        <form @submit.prevent="updUser">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="userDetail.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
          <label for="firstname">First Name</label>
          <input v-model="userDetail.firstName" type="text" class="form-control" id="firstname" required>
          </div>
          <div class="form-group">
            <label for="lastname">Last Name</label>
            <input v-model="userDetail.lastName" type="text" class="form-control" id="lastname" required>
          </div>
          <div class="form-group">
            <label for="avatar">Avatar</label>
            <input v-model="userDetail.avatar" type="url" class="form-control" id="avatar" placeholder="put the image link here" required>
          </div>
          <button type="submit" class="btn btn-primary">Update</button>
        </form>
      </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'Home',
  components: {},
  data () {
    return {
      email: localStorage.getItem('email'),
      currentPage: 1,
      rows: null,
      perPage: null,
      users: [],
      updated: [],
      add: {
        email: null,
        firstName: null,
        lastName: null,
        avatar: null
      },
      userDetail: {
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        avatar: null
      }
    }
  },
  computed: {
    ...mapGetters({
      allUsers: 'users/getAllUser'
    })
  },
  methods: {
    ...mapActions({
      actionLogout: 'auth/logout',
      actionGetAllUsers: 'users/getAllUser',
      actionAddUser: 'users/addUser',
      actionGetDetail: 'users/getDetail',
      actionUpdUser: 'users/updateUser',
      actionDelUser: 'users/delUser'
    }),
    page () {
      this.actionGetAllUsers(this.currentPage)
      this.$router.push({ path: '/', query: { page: this.currentPage } })
    },
    addUser () {
      this.actionAddUser(this.add)
        .then((result) => {
          Swal.fire('Created', `Insert data success email: ${result.email}`, 'success')
          this.users.push(result)
        })
    },
    detailUser (id, index) {
      this.actionGetDetail(id)
        .then((result) => {
          this.userDetail.id = result.data.id
          this.userDetail.email = result.data.email
          this.userDetail.firstName = result.data.first_name
          this.userDetail.lastName = result.data.last_name
          this.userDetail.avatar = result.data.avatar
        })
    },
    updUser () {
      this.actionUpdUser(this.userDetail)
        .then((result) => {
          Swal.fire('Updated', 'Update data success', 'success')
          this.updated.push(result)
        })
    },
    delUser (id) {
      this.actionDelUser(id)
        .then((result) => {
          Swal.fire('Deleted', `Status: ${result.status}`, 'success')
        })
    },
    onLogout () {
      this.actionLogout().then((resolve) => {
        window.location = '/login'
      })
    }
  },
  mounted () {
    this.actionGetAllUsers()
      .then((result) => {
        this.rows = result.total
        this.perPage = result.per_page
      })
  }
}
</script>
