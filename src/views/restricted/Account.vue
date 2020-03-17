<template>
  <div class="account-page">
    <div class="container page">
      <div class="row">
        <div v-if="isUserUpdated" class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Account updated.</h1>
        </div>
        <div v-else class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Account details</h1>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ v }}</li>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <label>First name: </label>
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="currentUser.FirstName"
                placeholder="First name"
              />
            </fieldset>
            <fieldset class="form-group">
              <label>Last name: </label>
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="currentUser.LastName"
                placeholder="Last name"
              />
            </fieldset>
            <fieldset class="form-group">
              <label>Username: </label>
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="currentUser.Username"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <label>Email: </label>
              <input
                class="form-control form-control-lg"
                type="email"
                v-model="currentUser.Email"
                placeholder="Email"
              />
              <div v-if="currentUser.IsConfirmedEmail">
                Email confirmed.
              </div>
              <div v-else>
                Email not confirmed.
                <span v-if="isConfirmEmailSent">
                  Sent confirm email.
                </span>
                <a
                  v-else
                  href="javascript:void(0)"
                  v-on:click="sendConfirmEmail"
                  >Resend email.</a
                >
              </div>
            </fieldset>
            <fieldset class="form-group">
              <label>Password: </label>
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Update
            </button>
          </form>
          <button
            v-on:click="deleteUser"
            class="btn btn-lg btn-danger pull-xs-right"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
import store from '@/store';
import {
  UPDATE_USER,
  CHECK_AUTH,
  SEND_CONFIRM_EMAIL,
  DELETE_USER
} from '@/store/actions.type';

export default {
  name: 'Account',
  beforeRouteEnter(to, from, next) {
    if (store.state.auth.isAuthenticated) next();
    else next({ name: 'home' });
  },
  data() {
    return {
      password: null,
      isConfirmEmailSent: false,
      isUserUpdated: false
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit() {
      var submitPayload = {
        first_name: this.currentUser.FirstName,
        last_name: this.currentUser.LastName,
        username: this.currentUser.Username,
        email: this.currentUser.Email,
        password: this.password
      };
      this.$store.dispatch(UPDATE_USER, submitPayload).then(() => {
        this.isUserUpdated = true;
        this.$store.dispatch(CHECK_AUTH);
      });
    },
    sendConfirmEmail() {
      this.$store
        .dispatch(SEND_CONFIRM_EMAIL, {
          email: this.currentUser.Email,
          confirm_email_url: 'http://localhost:8080/confirm_email'
        })
        .then(() => (this.isConfirmEmailSent = true));
    },
    deleteUser() {
      this.$store
        .dispatch(DELETE_USER)
        .then(() => this.$router.push({ name: 'home' }));
    }
  }
};
</script>
