<template>
  <div class="protected-page">
    <div class="container">
      <h1 class="title">This page is protected.</h1>
    </div>
  </div>
</template>

<script>
import store from "@/store"

export default {
  name: "Home",
  beforeRouteEnter(to, from, next) {
    if (store.state.auth.isAuthenticated) next()
    else next({ name: "home" })
  },
}
</script>
