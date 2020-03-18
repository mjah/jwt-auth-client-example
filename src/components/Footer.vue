<template>
  <footer class="footer mt-auto py-3">
    <div class="container">
      <span class="text-light">
        An example client for
        <a
          class="text-warning"
          rel="noopener noreferrer"
          target="blank"
          href="https://github.com/mjah/jwt-auth"
          >jwt-auth</a
        >. Source on
        <a
          class="text-warning"
          rel="noopener noreferrer"
          target="blank"
          href="https://github.com/mjah/jwt-auth-client-example"
          >GitHub</a
        >.
      </span>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: rgb(10, 10, 10);
  border-top: 1px solid rgb(255, 255, 255);
}
</style>

<script>
export default {
  name: 'Footer'
};
</script>
