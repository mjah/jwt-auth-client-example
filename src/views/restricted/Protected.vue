<template>
  <div class="protected-page">
    <div class="container">
      <h1 class="title">Call a protected API using the access token.</h1>
      <p>
        To-do: Refresh access token automatically if expired or close to expiry.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
  name: 'Home',
  beforeRouteEnter(to, from, next) {
    if (store.state.auth.isAuthenticated) next();
    else next({ name: 'home' });
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  watch: {
    isAuthenticated(newValue) {
      if (!newValue) this.$router.push({ name: 'home' });
    }
  }
};
</script>
