<template>
  <div class="auth-page">
    <div class="container page">
      <div v-if="isJustConfirmed">
        <p>Your email has been confirmed.</p>
      </div>
      <div v-else>
        <ul v-if="errors" class="error-messages">
          <li v-for="(v, k) in errors" :key="k">{{ v }}</li>
        </ul>
        <p>Your email has not been confirmed.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { CONFIRM_EMAIL } from '@/store/actions.type';

export default {
  name: 'ConfirmEmail',
  props: {
    email: {
      type: String
    },
    confirm_email_token: {
      type: String
    }
  },
  data() {
    return {
      isJustConfirmed: false
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store
        .dispatch(CONFIRM_EMAIL, {
          email: vm.email,
          confirm_email_token: vm.confirm_email_token
        })
        .then(() => {
          (vm.isJustConfirmed = true), next;
        });
    });
  }
};
</script>
