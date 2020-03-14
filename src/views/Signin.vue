<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'signup' }">
              Need an account?
            </router-link>
          </p>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ v }}</li>
          </ul>
          <form @submit.prevent="onSubmit">
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
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="checkbox"
                v-model="rememberMe"
                id="remember_me"
                name="remember_me"
                value="remember"
              />
              <label for="remember_me">Remember me</label>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
          <p class="text-xs-center">
            <router-link :to="{ name: 'forgot_password' }">
              Forgot password
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
import { SIGNIN } from '@/store/actions.type';

export default {
  name: 'Signin',
  beforeRouteEnter(to, from, next) {
    if (store.state.auth.isAuthenticated) next({ name: 'home' });
    else next();
  },
  data() {
    return {
      email: null,
      password: null,
      rememberMe: false
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
        .dispatch(SIGNIN, {
          email: this.email,
          password: this.password,
          remember_me: this.rememberMe
        })
        .then(() => this.$router.push({ name: 'home' }));
    }
  }
};
</script>
