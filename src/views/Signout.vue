<template>
  <div class="home-page">
    <div class="container page">
      <h1 class="title">You have signed out.</h1>
    </div>
  </div>
</template>

<script>
import store from "@/store"
import { SIGNOUT } from "@/store/actions.type"

export default {
  name: "Signout",
  beforeRouteEnter(to, from, next) {
    if (!store.state.auth.isAuthenticated) next({ name: "home" })
    store.dispatch(SIGNOUT).then(next)
  },
}
</script>
