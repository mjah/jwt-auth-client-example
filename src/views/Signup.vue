<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div v-if="!isSignedUp" class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'signin' }">
              Have an account?
            </router-link>
          </p>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ v }}</li>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="firstname"
                placeholder="First name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="lastname"
                placeholder="Last name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="username"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                autocomplete="new-password"
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
        <div v-else class="col-md-6 offset-md-3 col-xs-12">
          <h1>Account registered.</h1>
          <p>Please check your email inbox to confirm your email address.</p>
          <p>
            <router-link :to="{ name: 'signin' }">
              Sign In
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store';
import { SIGNUP } from '@/store/actions.type';

export default {
  name: 'Signup',
  beforeRouteEnter(to, from, next) {
    if (store.state.auth.isAuthenticated) next({ name: 'home' });
    else next();
  },
  data() {
    return {
      isSignedUp: false,
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: ''
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(SIGNUP, {
          first_name: this.firstname,
          last_name: this.lastname,
          username: this.username,
          email: this.email,
          password: this.password,
          confirm_email_url: 'http://localhost:8080/confirm_email'
        })
        .then(() => {
          this.isSignedUp = true;
        });
    }
  }
};
</script>
