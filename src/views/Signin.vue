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
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
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
                v-model="remember_me"
                id="remember_me"
                name="remember_me"
                value="remember">
              <label for="remember_me">Remember me</label>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
          <p class="text-xs-center">
            <router-link :to="{ name: 'forgotpassword' }">
              Forgot password
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signin",
}
</script>
