<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Forgot password</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'signin' }">
              Remember password?
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
            <button class="btn btn-lg btn-primary pull-xs-right">
              Send Reset Password Link
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
}
</script>
