<template>
  <header>
    <nav
      class="navbar navbar-expand-md navbar-dark fixed-top"
      :class="[!!isAuthenticated ? 'acc-bb-green' : 'acc-bb-red']"
    >
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'home' }">
          JWT Auth Client Example
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul v-if="!isAuthenticated" class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                :to="{ name: 'signin' }"
              >
                Sign In
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                :to="{ name: 'signup' }"
              >
                Sign Up
              </router-link>
            </li>
          </ul>
          <ul v-else class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link">
                Hello {{ currentUser.FirstName }} {{ currentUser.LastName }}!
              </a>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                :to="{ name: 'protected' }"
              >
                Protected
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                :to="{ name: 'account' }"
              >
                Account
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                :to="{ name: 'signout' }"
              >
                Sign Out
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
nav {
  background-color: rgb(10, 10, 10);
}
.acc-bb-green {
  border-bottom: 1px solid rgb(0, 255, 0);
}
.acc-bb-red {
  border-bottom: 1px solid rgb(255, 0, 0);
}
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated'])
  }
};
</script>
