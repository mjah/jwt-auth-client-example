<template>
  <nav class="navbar navbar-dark">
    <router-link class="navbar-brand" :to="{ name: 'home' }">
      home
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Header"
}
</script>
