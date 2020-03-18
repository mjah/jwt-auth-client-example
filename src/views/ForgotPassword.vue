<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div v-if="isEmailSent" class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            If the email exists, then an email to reset the password has been
            sent!
          </h1>
        </div>
        <div v-else class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Forgot password</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'signin' }">
              Remember password?
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
            <button class="btn btn-lg btn-primary">
              Send Reset Password Link
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { mapState } from 'vuex';
import { SEND_RESET_PASSWORD } from '@/store/actions.type';

export default {
  name: 'ForgotPassword',
  beforeRouteEnter(to, from, next) {
    if (store.state.auth.isAuthenticated) next({ name: 'home' });
    else next();
  },
  data() {
    return {
      isEmailSent: false,
      email: null
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
        .dispatch(SEND_RESET_PASSWORD, {
          email: this.email,
          reset_password_url: 'http://localhost:8080/reset_password'
        })
        .then(() => (this.isEmailSent = true));
    }
  }
};
</script>
