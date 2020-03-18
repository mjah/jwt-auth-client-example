<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div v-if="isEmailSent" class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Password has been reset!</h1>
        </div>
        <div v-else class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Reset password</h1>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ v }}</li>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { RESET_PASSWORD } from '@/store/actions.type';

export default {
  name: 'ResetPassword',
  props: {
    email: {
      type: String
    },
    reset_password_token: {
      type: String
    }
  },
  data() {
    return {
      isEmailSent: false,
      password: null
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
        .dispatch(RESET_PASSWORD, {
          email: this.email,
          reset_password_token: this.reset_password_token,
          password: this.password
        })
        .then(() => (this.isEmailSent = true));
    }
  }
};
</script>
