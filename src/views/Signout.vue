<template>
  <div class="home-page">
    <div class="container page">
      <h1 v-if="isSignoutAll" class="title">You have signed out everywhere.</h1>
      <h1 v-else class="title">You have signed out.</h1>
    </div>
  </div>
</template>

<script>
import { SIGNOUT, SIGNOUT_ALL } from '@/store/actions.type';

export default {
  name: 'Signout',
  data() {
    return {
      isSignoutAll: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.state.auth.isAuthenticated) {
        next({ name: 'home' });
      } else if (to.name === 'signout_all') {
        vm.isSignoutAll = true;
        vm.$store.dispatch(SIGNOUT_ALL).then(next);
      } else {
        vm.$store.dispatch(SIGNOUT).then(next);
      }
    });
  }
};
</script>
